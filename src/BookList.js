import React from 'react'
import Book from './Book'

const BookList = props => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book, index) =>
          <Book 
            key={index} 
            book={book} 
            onChangeShelf={props.onChangeShelf} 
          />
        )
        }
      </ol>
    </div>
  )
}

export default BookList;