import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {

  state = {
    query: '',
    search_results: [],
  }
  
  filterShelfBooks = (books) => {
    const shelf_ids = this.props.shelfBooks.map((b) => b.id)
    const search_ids = books.map((b) => b.id)
    const searchInShelfIds = shelf_ids.filter((id) => search_ids.includes(id))
    return [...books.filter((b) => {return !shelf_ids.includes(b.id)}),
        ...this.props.shelfBooks.filter((b) => searchInShelfIds.includes(b.id))]
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
      search_results: []
    }))
    if (query !== '') {
      BooksAPI
      .search(query.toLowerCase())
      .then((books) => {
        // update state if no error entry in the response
        if (!("error" in books)) {
          this.setState(() => ({
                  query: query,
                  search_results: this.filterShelfBooks(books)
                }))
        }
      })
    }
  }

  render() {
    const { query, search_results } = this.state;
    const { onChangeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={query}
              onChange={(event)=> this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {search_results.map((book) =>
              <Book 
                key={`${book.id}`} 
                book={book} 
                onChangeShelf={onChangeShelf} 
              />
            )}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;