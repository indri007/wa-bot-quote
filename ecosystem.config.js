module.exports = {
  apps: [{
    name: 'wa-bot',
    script: 'bot.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PUPPETEER_SKIP_CHROMIUM_DOWNLOAD: 'true',
      PUPPETEER_EXECUTABLE_PATH: '/usr/bin/chromium',
      NEWS_API_KEY: '05f96aa3312e44b0a8d7807e12733e5c',
      FOOTBALL_API_KEY: '692831933e644d3eb42f80e62856fe67',
      OMDB_API_KEY: 'b1a7b542',
      NUTRITION_API_KEY: 'flCk9ITCjlM5UgJNOGvrIw==htM5mkHmOb34IzBA'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
