// =============================================================
// FILE: ecosystem.config.cjs
// Vista İnşaat Backend — PM2 config
// - binds to 127.0.0.1:8086 (reverse proxy only)
// - crash-loop protection + graceful shutdown
// - logs under /home/orhan/.pm2/logs
// =============================================================

module.exports = {
  apps: [
    {
      name: 'vistainsaat-backend',
      cwd: '/var/www/vistainsaat/backend',

      script: '/home/orhan/.bun/bin/bun',
      args: 'dist/index.js',

      exec_mode: 'fork',
      instances: 1,

      watch: false,
      autorestart: true,

      max_memory_restart: '350M',

      min_uptime: '30s',
      max_restarts: 10,
      restart_delay: 5000,

      kill_timeout: 8000,
      listen_timeout: 10000,

      env: {
        NODE_ENV: 'production',
        HOST: '127.0.0.1',
        PORT: '8086',
      },

      out_file: '/home/orhan/.pm2/logs/vistainsaat-backend.out.log',
      error_file: '/home/orhan/.pm2/logs/vistainsaat-backend.err.log',
      combine_logs: true,
      time: true,
    },
  ],
};
