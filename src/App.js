import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'


class BooksApp extends Component {

  state={
    books: [],
    foundbooks: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks=() => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  moveBook=(book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  findBook=(query, maxResults) => {
    this.setState(state => {
      if (query !== null && query.trim() !== '') {
        BooksAPI.search(query, maxResults).then(resultbooks => {
          if (resultbooks !== undefined) {
            if (resultbooks.length > 0) {
              for (const resultbook of resultbooks) {
                  resultbook.shelf="none"
                for(const book of this.state.books) {
                   if (book.id === resultbook.id) {
                     resultbook.shelf = book.shelf
                   }
                }
              }
              if (resultbooks.length > 0 && this.state.foundbooks !== resultbooks){
                  this.setState({ foundbooks: resultbooks })
                }
            }
          }
        })
      } else {
        this.setState({ foundbooks: [] })
      }
    })
  }

  render() {
    return ( <div className="BooksApp">
      <h1 className="list-books-title"> My Reads </h1>
      <Route path="/search"
        render={() => (
           <div>
            <div className="search-books-bar">
              <Link className="close-search" to="/" />
              <div className="search-books-input-wrapper">
                <input
                  className="search-books-bar"
                  type="text"
                  placeholder="Search books"
                  onChange={(event) => this.findBook(event.target.value, 5)}
                />
              </div>
            </div>
            <div>

            <SearchBooks shelfTitle="Search Results"
              onMoveBook={ this.moveBook }
              searchlist={ this.state.foundbooks }
            />
          </div>
          </div>
          )
        }
      />

      <Route path="/" exact
        render={() => (
            <div>
              <div className="open-search">
              <Link to="/search"
                onClick={ this.getBooks }>
              </Link>
              </div>
              <ListBooks
                shelfTitle="Currently Reading"
                onDeleteBook={ this.removeBook }
                onMoveBook={ this.moveBook }
                booklist={ this.state.books.filter((books) => books.shelf === 'currentlyReading') }
              />
              <ListBooks
                shelfTitle="Want To Read"
                onDeleteBook={ this.removeBook }
                onMoveBook={ this.moveBook }
                booklist={ this.state.books.filter((books) => books.shelf === 'wantToRead') }
              />
              <ListBooks
                shelfTitle="Read"
                onDeleteBook={ this.removeBook }
                onMoveBook={ this.moveBook }
                booklist={ this.state.books.filter((books) => books.shelf === 'read') }
              />
            </div>
          )
        }
      />

    </div>

    )
  }
}

export default BooksApp
