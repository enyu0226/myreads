import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BookShelf from '../components/BookShelf';
import * as BooksAPI from '../BooksAPI';

export default class SearchBar extends Component {
  state = {
    results: [],
  }

  handleSearch = (ev) => {
    const { books } = this.props;
    const query = ev.target.value.trim();
    if (query) {
      BooksAPI.search(query, 20).then((results) => {
        if (results && results.length > 0) {
          results = results.filter(res => res.imageLinks);
          results = results.map(res => {
            const idx = books.findIndex(book => book.id === res.id);
            res["shelf"] = idx === -1 ? "none" : books[idx].shelf;
            return res;
          });
          this.setState({ results });
        }
      });
    }
  }

  render() {
    const { results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              ref={input => input && input.focus()}
              placeholder="Search by title or author"
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ToastContainer
            className="spacer-top"
            toastClassName="dark-toast"
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
          {results.length > 0 &&
            <BookShelf
              books={results}
              moveTo={(book, shelf) => this.props.moveTo(book, shelf)}
            />}
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  books: PropTypes.array,
  moveTo: PropTypes.func,
}
