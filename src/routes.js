const bookHandler = require('./modules/book/handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: bookHandler.store,
  },
  {
    method: 'GET',
    path: '/books',
    handler: bookHandler.index,
  },
];

module.exports = routes;
