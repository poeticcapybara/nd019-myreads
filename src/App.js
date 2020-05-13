import React from 'react'
import './App.css'
import { Route} from 'react-router-dom'
import SearchBook from './SearchBook'
import BookLibrary from './BookLibrary'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  bookInShelf = (book) => {
    const books = this.state.books;
    for (let b of books) {
      if (b.id === book.id) {
        return true;
      }
    }
    return false;
  };

  updateShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf)
    .then(response => {
      // update or add shelf information
      book.shelf = newShelf;
      this.setState(prevState => ({
        books: prevState.books
        .filter(b => b.id !== book.id)
        .concat(book)
      }))
    })
  };

  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBook
            shelfBooks={this.state.books}
            onChangeShelf={this.updateShelf}
          />)}
        />
        <Route exact path='/' render={() => (
          <BookLibrary 
            books = {this.state.books}
            updateShelf = {this.updateShelf}
          />)}
        />
      </div>
    )
  }
}

export default BooksApp
