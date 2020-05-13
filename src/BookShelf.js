import React from 'react'
import BookList from './BookList'

const BookShelf = (props) => { 
    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <BookList 
        books={props.books.filter((book) => book.shelf === props.shelf)} 
        onChangeShelf={props.updateShelf} 
      />
    </div>
    );
}

export default BookShelf;