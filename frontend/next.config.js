module.exports = {
  async redirects () {
    return [
      {
        source: '/',
        destination: '/canvas',
        permanent: true
      }
    ]
  }
}
