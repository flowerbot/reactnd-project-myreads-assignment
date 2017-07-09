import React, { Component } from 'react'
/* import { Link } from 'react-router-dom' */
//import PropTypes from 'prop-types'
//import escapeRegExp from 'escape-string-regexp'
/* import sortBy from 'sort-by' */



class ListBooks extends Component {

    state = {
      selectedShelf: ''
    }

    changeShelf = (shelf) => {

      console.log(shelf)
    /*  this.setState({this.state.shelf: this.state.value }) */
    }

  render() {

    return (
      <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
      <div className="bookshelf-books">
      <div className="books-grid">
      {this.props.booklist.map((book) => (
        <div className="book" key={book.id}>
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                  <div className="book-shelf-changer">
                    <select
                      value={book.shelf}
                      onChange={(event) => this.props.onMoveBook(book, event.target.value)}
                      >
                      <option value="none" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>


      ))}
      </div>
      </div>
      </div>

    )
  }
}

export default ListBooks
