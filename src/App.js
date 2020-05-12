import React from 'react'
import './App.css'
import BookList from './BookList'
import { Route, Link } from 'react-router-dom'
import SearchBook from './SearchBook'
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

  removeBook = (book) => {
    this.setState((prevState) => ({
      books: prevState.books.filter((b) => {
        return b.id !== book.id
      })
    }))
  }

  addBook = (book) => {
    this.setState((prevState) => ({
      books: prevState.books.concat([book])
    }))
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
    if (!this.bookInShelf(book)){
      console.log('Adding book! :)', book)
      this.addBook({...book, shelf:newShelf})
    } else if (newShelf==='none'){
      console.log('Removing book! :(', book)
      this.removeBook(book)
    } else {
      this.setState(state => {
        const books = state.books.map((b) => {
          if (b.id === book.id) {
            return {...b, shelf:newShelf}
          } else {
            return b
          }
        })
        return {
          books
        }
      })

      BooksAPI.update(book, newShelf)
    }
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
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <BookList 
                    books={this.state.books.filter((book) => book.shelf === 'currentlyReading')} 
                    onChangeShelf={this.updateShelf} 
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <BookList 
                    books={this.state.books.filter((book) => book.shelf === 'wantToRead')} 
                    onChangeShelf={this.updateShelf} 
                  />
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <BookList 
                    books={this.state.books.filter((book) => book.shelf === 'read')} 
                    onChangeShelf={this.updateShelf} 
                  />
                </div>
              </div>
            </div>
            <Link to="/search" className="open-search"><button >Add a book</button></Link>
          </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
