module.exports = {
  apps: [{
    name: 'wa-bot-baileys',
    script: 'bot-new-baileys.js',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 5000,
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production',
      TZ: 'Asia/Jakarta',
      NODE_VERSION: '22',
      UV_THREADPOOL_SIZE: '128'
    },
    env_production: {
      NODE_ENV: 'production',
      TZ: 'Asia/Jakarta',
      NODE_VERSION: '22',
      UV_THREADPOOL_SIZE: '128'
    },
    node_args: [
      '--max-old-space-size=1024',
      '--enable-source-maps'
    ],
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    kill_timeout: 5000,
    listen_timeout: 10000,
    cron_restart: '0 2 * * *', // Auto restart daily at 2 AM
    ignore_watch: [
      'node_modules',
      'logs',
      'baileys-auth',
      'wa-session',
      '.wwebjs_auth',
      '.wwebjs_cache'
    ],
    // PM2 specific configurations
    pmx: false,
    automation: false,
    vizion: false,
    // Health monitoring
    max_cpu: 80,
    // Graceful shutdown
    shutdown_with_message: true,
    wait_ready: true,
    // Log rotation
    log_type: 'json',
    // Node.js v22 specific optimizations
    interpreter: 'node',
    interpreter_args: '--experimental-modules --es-module-specifier-resolution=node'
  }]
};
