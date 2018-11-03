import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BookShelf from '../components/BookShelf';

export default class BookShelfContainer extends Component {
  state = {
    curShelf: 'currentlyReading',
    isLoading: true,
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 500);
  }

  chooseShelf = (ev) => {
    this.setState({ curShelf: ev.target.value });
  }

  isActiveShelf = (name) => {
    return name === this.state.curShelf ? 'active-shelf' : '';
  }

  renderBookShelf = (books) => {
    if (books){
    const _books = books.filter(book => book.shelf === this.state.curShelf);
    return (
      <BookShelf
        books={_books}
        moveTo={(book, shelf) => this.props.moveTo(book, shelf)}
      />
    
    )
  }
  }

  renderLoading = () => {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    );
  }

  render() {
    const { isLoading} = this.state;
    const { books } = this.props;
    return (
      <div className="list">
        <ToastContainer
          toastClassName="dark-toast"
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {isLoading ? this.renderLoading() : this.renderBookShelf(books)}
          </div>
        </div>
        <div className="list-books-control">
          <button className={this.isActiveShelf('currentlyReading')} onClick={this.chooseShelf} value="currentlyReading">Currently Reading</button>
          <button className={this.isActiveShelf('wantToRead')} onClick={this.chooseShelf} value="wantToRead">Want To Read</button>
          <button className={this.isActiveShelf('read')} onClick={this.chooseShelf} value="read">Read</button>
        </div>
        <div className="open-search">
          <Link to="/search" />
        </div>
      </div>
    );
  }
}
