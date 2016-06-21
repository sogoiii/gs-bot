module.exports = {
  port: process.env.PORT || 3000,
  git: {
    host: process.env.GIT_HOST || 'api.github.com',
    userAgent: process.env.GIT_UA || 'My-Cool-GitHub-App',
    token: process.env.GIT_AUTH_TOKEN,
    org: process.env.GIT_ORG  || 'nodejs',
    per_page: process.env.GIT_PER_PAGE || 10,
    debug: false
  }
}
