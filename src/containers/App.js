import React from 'react';
import { Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as BooksAPI from '../BooksAPI';
import SearchBar from './SearchBar';
import BookShelfContainer from './BookShelfContainer';
import 'react-toastify/dist/ReactToastify.min.css';
import '../stylesheets/App.css';

class BooksApp extends React.Component {
  state = {
    curShelf: 'currentlyReading',
    books: [],
  }

  componentDidMount() {
    this.fetchBooks();
  }

    fetchBooks = () => {
    BooksAPI.getAll()
      .then(books => {
      this.setState({ books });
    })
    .catch(()=>{
      const toastStr = `Can't Connect to MyReads`;
        toast.error(toastStr, {
        className: 'red-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000
      });
        console.log("error: The books cannot be loaded from the server.");
  })

  }

  camel2title = (camelCase) => camelCase
    .replace(/([A-Z])/g, (match) => ` ${match}`)
    .replace(/^./, (match) => match.toUpperCase());

  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks();
      const shelfName = this.camel2title(shelf);
      const toastStr = shelf === "none" ? `Removed "${book.title}"!` : `Moved "${book.title}" to ${shelfName}!`;
      toast(toastStr, {
        className: 'dark-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000
      });
    })
    .catch(()=> {
      const toastStr = `Can't Connect to MyReads`;
        toast.error(toastStr, {
        className: 'red-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000
      });

      console.log(`error: The book ${book.title} cannot change from ${book.shelf} since update cannot be issued to the server.`)

 }) 
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelfContainer
            books={this.state.books}
            moveTo={(book, shelf) => this.handleMove(book, shelf)}
          />
        )} />
        <Route path="/search" render={() => (
          <SearchBar
            books={this.state.books}
            moveTo={(book, shelf) => this.handleMove(book, shelf)}
          />
        )} />
      </div>
    );
  }
}

export default BooksApp;
