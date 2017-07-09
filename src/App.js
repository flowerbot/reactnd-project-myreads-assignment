import React, { Component } from 'react'
import ListBooks from './ListBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'


class BooksApp extends Component {

  state={
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  removeBook = (book) => {
    this.setState((state) => ({
      books: state.books.filter((b) => b.id !== book.id)
    }))
  }

  moveBook = (book, shelf) => {
    this.setState(state => {
        book.shelf = shelf
        state.books.concat([ book ])
      })
      BooksAPI.update(book,shelf)
  }

  render() {
    return (
      <div className="BooksApp">
      <ListBooks
        shelfTitle='Currently Reading'
        onDeleteBook={this.removeBook}
        onMoveBook={this.moveBook}
        booklist={this.state.books.filter((books) => books.shelf === 'currentlyReading')}
      />
      <ListBooks
        shelfTitle='Want To Read'
        onDeleteBook={this.removeBook}
        onMoveBook={this.moveBook}
        booklist={this.state.books.filter((books) => books.shelf === 'wantToRead')}
      />
      <ListBooks
        shelfTitle='Read'
        onDeleteBook={this.removeBook}
        onMoveBook={this.moveBook}
        booklist={this.state.books.filter((books) => books.shelf === 'read')}
      />
       </div>
    )
  }
}

export default BooksApp
