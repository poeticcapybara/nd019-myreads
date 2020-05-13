import React, { Component} from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

class BookLibrary extends Component {

  render() {
    // Hard-coded shelf names
    const shelves = ["currentlyReading", "wantToRead", "read"] 
    const {books, updateShelf} = this.props;
    return (
    <div className="list-books">
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>
    <div className="list-books-content">
      <div>
        {shelves.map(shelf => <BookShelf 
                                books={books} 
                                updateShelf={updateShelf}
                                shelf={shelf}                      
                              />
        )}
      </div>
    </div>
    <Link to="/search" className="open-search"><button >Add a book</button></Link>
    </div>
    )
  }
}

export default BookLibrary;