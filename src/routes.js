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
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: bookHandler.show,
  },
];

module.exports = routes;
