import React, { Component } from 'react'



class ListBooks extends Component {


  render() {

    const { shelfTitle } = this.props

    return (

    <div>
      <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <div className="books-grid">
            {this.props.booklist.map((book) => (
                   <div className="book" key={book.id}>
                        <div className="book-top">
                           <a href={book.infoLink} target="_blank" title="click for info">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>
                            </a>
                               <div className="book-shelf-changer" title="click to move shelf">
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
                           <div className="book-authors">{(book.authors).toString()
                           }</div>
                         </div>
                 ))}
          </div>
        </div>
      </div>
    </div>



    )
 }
}

export default ListBooks
