const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/v1', // Le chemin de votre API
    createProxyMiddleware({
      target: 'https://rdvdoctor.tigerdigital.tech',
      changeOrigin: true,
    })
  );
};
