const { nanoid } = require('nanoid');
const books = require('./books');

const store = (request, h) => {
  const { 
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading ,
  } = request.payload

  /**
   * Validation
   */
  let message = null

  if (!name) {
    message = 'Gagal menambahkan buku. Mohon isi nama buku'
  } else if (readPage > pageCount) {
    message = 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
  }

  if (message) return h.response({
      status: 'fail',
      message,
    })
    .code(400);

    
  try {
    const id = nanoid(16)
    const finished = pageCount === readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    books.push({
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      insertedAt,
      updatedAt
    })

    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })
    .code(201);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Buku gagal ditambahkan',
    })
    .code(500);
  }
}

const index = () => {
  const booksFormatted = books.map(book => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }
  })

  return {
    status: 'success',
    data: {
      books: booksFormatted
    }
  }
}

const show = (request, h) => {
  const { bookId } = request.params
  const book = books.find(el => el.id === bookId)

  if (!book) return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    })
    .code(404)

  return {
    status: 'success',
    data: {
      book
    }
  }
}

const update = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload
  const { bookId } = request.params
  const updatedAt = new Date().toISOString()

  /**
   * Validation
   */
  let message = null

  if (!name) {
    message = 'Gagal memperbarui buku. Mohon isi nama buku'
  } else if (readPage > pageCount) {
    message = 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
  }

  if (message) return h.response({
      status: 'fail',
      message,
    })
    .code(400);

  const bookIndex = books.findIndex(book => book.id === bookId)

  if (bookIndex < 0) {
    message = 'Gagal memperbarui buku. Id tidak ditemukan'
  }

  if (message) return h.response({
      status: 'fail',
      message,
    })
    .code(404);

  try {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }

    return h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200);
  } catch (error) {
    return h.response({
      status: 'error',
      message: 'Buku gagal diperbarui',
    })
    .code(500);
  }
}

module.exports = {
  store,
  index,
  show,
  update,
};
