module.exports = {
  apps: [{
    name: 'wa-bot-baileys',
    script: 'bot-new-baileys.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 5000, // 5 second delay
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    kill_timeout: 5000,
    listen_timeout: 10000,
    cron_restart: '0 2 * * *' // Auto restart daily at 2 AM
  }]
};
