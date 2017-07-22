import React, { Component } from 'react'


class SearchBooks extends Component {

  render() {

    const { shelfTitle } = this.props

    return (

      <div>

        <div className="bookshelf">
          <h2 className="bookshelf-title">{shelfTitle}</h2>
          <div className="bookshelf-books">
            <div className="books-grid">

              {this.props.searchlist.map((book) => (
                     <div className="book" key={book.id}>
                             <div className="book-top">
                               <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                                 <div className="book-shelf-changer">
                                   <select
                                     value={book.shelf}
                                     onChange={(event) => this.props.onMoveBook(book, event.target.value)}
                                     >
                                     <option value="none" disabled>Add to...</option>
                                     <option value="currentlyReading">Currently Reading</option>
                                     <option value="wantToRead">Want to Read</option>
                                     <option value="read">Read</option>
                                   </select>
                                 </div>
                             </div>
                             <div className="book-title">{book.title}</div>
                             <div className="book-authors">{book.authors.map((name, i, arr) => {
                                let separator = ", "
                                if(i === arr.length-2) { separator = " and "}
                                if(i === arr.length-1) {separator = ""}
                                return name + separator
                             })}</div>
                           </div>
                   ))}
            </div>
          </div>
        </div>
      </div>



    )
 }
}

export default SearchBooks
