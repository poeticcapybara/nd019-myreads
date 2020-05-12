import React from 'react'
import Book from './Book'

const BookList = props => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) =>
          <Book 
            key={book.id} 
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