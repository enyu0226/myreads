# MyReads

A bookshelf app that allows a user to select and categorize books as currently reading, want to read, or have read. The project emphasizes using React to build the application and provides an API server and client library that are use to persist information as the user interacts with the application.

*Additional feature implemented: react-router is used for client side content routing during book recategoization, react-toastr is used to pulish a new toast when book recategoization occurs, potential network problem is caught using promise and the error message is displayed using the toast to improve UI experience. 


## Getting Started
### Pre-requisites
* `npm` (or `yarn`)

### Running the app
* Clone or download the repository
* Run `npm install` in your terminal
* Use `npm start` or `yarn start` to run the app locally
* Navigate to `localhost:3000`

## Backend Server
To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

### `getAll()`
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update(book, shelf)`
* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search(query, maxResults)`
* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## create-react-app
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
