import React from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends React.Component {

  state = {
    query: '',
    search_results: [],
  }
  
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
      books: []
    }), () =>
      {if (query !== '') {
        BooksAPI
        .search(query.toLowerCase())
        .then((books) => {
          if (!("error" in books)) {
            this.setState(() => ({
                    query: query.trim(),
                    search_results: books
                  }))
          }
        })
        .then(() => {
          const shelf_ids = this.props.shelfBooks.map((sb) => sb.id)
          const search_ids = this.state.search_results.map((srb) => srb.id)
          const searchInShelfIds = shelf_ids.filter((id) => search_ids.includes(id))
          this.setState((prevState) => ({
            books: [...prevState.search_results.filter((b) => {return !shelf_ids.includes(b.id)}),
              ...this.props.shelfBooks.filter((b) => searchInShelfIds.includes(b.id))]
          }))
        })  
      }
    }
    )
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
            {search_results.map((book, index) =>
              <Book 
                key={`book-id-${index}`} 
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