import React from 'react'


class Book extends React.Component {
  handleChangeShelf = (e) => {
    if (this.props.onChangeShelf)
    {
      console.log('onChangeShelf')
      this.props.onChangeShelf(this.props.book, e.target.value)
    }
  }

  render() {

    const {book, } = this.props

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div 
              className="book-cover" 
              style={{ 
                width: 128,
                height: 193, 
                backgroundImage: book.imageLinks ? `url("${book.imageLinks.thumbnail}")`: "" }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={this.handleChangeShelf} value={book.shelf ? book.shelf : "none"}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors 
            ? book.authors.map((a, index) => <span key={`author-${index}`}>{a}<br /></span>)
            : ""}
          </div>
        </div>
      </li>
    )
  }
}
export default Book;
