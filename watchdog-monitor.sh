#!/bin/bash

# Watchdog Monitor untuk Bot WhatsApp
# Script ini memonitor bot dan force restart jika tidak responsif

BOT_NAME="wa-bot"
LOG_FILE="./logs/watchdog.log"
CHECK_INTERVAL=120 # Check every 2 minutes

echo "🐕 Watchdog Monitor Started at $(date)" | tee -a $LOG_FILE
echo "Monitoring bot: $BOT_NAME" | tee -a $LOG_FILE
echo "Check interval: ${CHECK_INTERVAL}s" | tee -a $LOG_FILE
echo "----------------------------------------" | tee -a $LOG_FILE

while true; do
    # Check if bot is running
    if ! pm2 list | grep -q "$BOT_NAME.*online"; then
        echo "❌ [$(date)] Bot is NOT running! Starting..." | tee -a $LOG_FILE
        pm2 start ecosystem.config.js
        sleep 10
        continue
    fi
    
    # Get bot status
    STATUS=$(pm2 jlist | jq -r ".[] | select(.name==\"$BOT_NAME\") | .pm2_env.status")
    RESTARTS=$(pm2 jlist | jq -r ".[] | select(.name==\"$BOT_NAME\") | .pm2_env.restart_time")
    UPTIME=$(pm2 jlist | jq -r ".[] | select(.name==\"$BOT_NAME\") | .pm2_env.pm_uptime")
    MEMORY=$(pm2 jlist | jq -r ".[] | select(.name==\"$BOT_NAME\") | .monit.memory")
    
    # Calculate uptime in minutes
    CURRENT_TIME=$(date +%s)
    UPTIME_SEC=$((CURRENT_TIME - UPTIME / 1000))
    UPTIME_MIN=$((UPTIME_SEC / 60))
    
    # Convert memory to MB
    MEMORY_MB=$((MEMORY / 1024 / 1024))
    
    echo "✅ [$(date)] Status: $STATUS | Restarts: $RESTARTS | Uptime: ${UPTIME_MIN}m | Memory: ${MEMORY_MB}MB" | tee -a $LOG_FILE
    
    # Check for excessive restarts (more than 10 in last check)
    if [ -f /tmp/last_restart_count ]; then
        LAST_RESTARTS=$(cat /tmp/last_restart_count)
        RESTART_DIFF=$((RESTARTS - LAST_RESTARTS))
        
        if [ $RESTART_DIFF -gt 5 ]; then
            echo "⚠️ [$(date)] WARNING: $RESTART_DIFF restarts detected! Bot might be unstable." | tee -a $LOG_FILE
        fi
    fi
    echo $RESTARTS > /tmp/last_restart_count
    
    # Check logs for health check failures
    RECENT_LOGS=$(pm2 logs $BOT_NAME --lines 50 --nostream 2>/dev/null)
    
    if echo "$RECENT_LOGS" | grep -q "Health check FAILED"; then
        FAIL_COUNT=$(echo "$RECENT_LOGS" | grep -c "Health check FAILED")
        echo "⚠️ [$(date)] WARNING: $FAIL_COUNT health check failures detected in recent logs" | tee -a $LOG_FILE
    fi
    
    if echo "$RECENT_LOGS" | grep -q "FORCING RESTART"; then
        echo "🔄 [$(date)] Bot triggered self-restart due to unresponsiveness" | tee -a $LOG_FILE
    fi
    
    # Check if bot has been up for too long without restart (memory leak prevention)
    if [ $UPTIME_MIN -gt 720 ]; then # 12 hours
        echo "⚠️ [$(date)] Bot uptime > 12 hours. Consider manual restart to prevent memory leaks." | tee -a $LOG_FILE
    fi
    
    sleep $CHECK_INTERVAL
done
