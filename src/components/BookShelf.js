import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  render() {
    const { books, moveTo } = this.props;
    return (
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, idx) => (
              <Book
                key={idx}
                shelf={book.shelf}
                thumbnail={book.imageLinks.thumbnail}
                moveTo={(shelf) => moveTo(book, shelf)}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = {
  books: PropTypes.array,
  moveTo: PropTypes.func,
}

export default BookShelf;
