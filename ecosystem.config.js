module.exports = {
  apps: [{
    name: 'wa-bot',
    script: 'bot-new.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '800M', // Lower threshold for faster restart
    min_uptime: '30s', // Shorter uptime requirement
    max_restarts: 50, // Allow more restarts (watchdog will trigger these)
    restart_delay: 2000, // 2 second delay between restarts
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production',
      PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true',
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium-browser'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    kill_timeout: 3000, // Faster kill
    listen_timeout: 8000,
    cron_restart: '0 */6 * * *', // Auto restart every 6 hours
    max_cpu: 80 // Restart on high CPU
  }]
};
