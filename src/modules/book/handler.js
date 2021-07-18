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

module.exports = {
  store,
  index,
  show,
};
