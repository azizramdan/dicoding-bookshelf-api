const bookHandler = require('./modules/book/handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookHandler.store,
  },
];

module.exports = routes;
