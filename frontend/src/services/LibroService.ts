import axios from 'axios'

const ENDPOINT_PATH = import.meta.env.VITE_ENDPOINT_PATH;

const libroService = {
  getBooks() {
    return axios.get(ENDPOINT_PATH + '/book')
  },

  getBookById(_id: string) {
    return axios.get(ENDPOINT_PATH + '/book/' + _id)
  },

  createBook(book: {}) {
    return axios.post(
      ENDPOINT_PATH + '/book', // URL de la solicitud
      book   // El cuerpo de la solicitud
    );
  },

  modifyBook(_id: string, book: {}) {
    return axios.patch(
      ENDPOINT_PATH + '/book/' + _id,
      book
    );
  },

  deleteBook(_id: string) {
    return axios.delete(ENDPOINT_PATH + '/book/' + _id)
  }
}

export default libroService