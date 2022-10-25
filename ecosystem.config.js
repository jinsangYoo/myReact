module.exports = {
  apps: [
    {
      /* 개발 환경용 서버 */
      name: 'myReact-dev',
      script: './server.js',
      instances: 1, // 단일 쓰레드
      autorestart: false,
      watch: true,
      env: {
        Server_PORT: 8080,
        NODE_ENV: 'development'
      }
    },
    {
      /* 배포 환경용 서버 */
      name: 'myReact-pd',
      script: './server.js',
      instances: -1, // 클러스터 모드
      autorestart: true,
      watch: false,
      env: {
        Server_PORT: 8080,
        NODE_ENV: 'production'
      }
    }
  ]
}
