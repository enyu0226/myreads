
const api = "https://reactnd-books-api.udacity.com"


// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const get = (bookId) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book)
    .catch(() => console.log("cannot obtain book from the parsed response object"))
export const getAll = () =>
  fetch(`${api}/books`, { headers })
    //.catch(() => console.log("cannot fetch books from server"))
    .then(res => res.json())
    //.catch(()=> console.log("cannot parsed the response object"))
    .then(data => data.books)
    //.catch(() => console.log("cannot obtain books from the parsed response object"))

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  //.catch(() => console.log("Cannot perform web search. Check your Internet connection or server maybe down."))
  .then(res => res.json())
  .then(data => data.books)
  .catch(() => console.log("Cannot perform web search. Please check your Internet connection."))