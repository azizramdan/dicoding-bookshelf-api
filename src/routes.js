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
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: bookHandler.update,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: bookHandler.destroy,
  },
];

module.exports = routes;
