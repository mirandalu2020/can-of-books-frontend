import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import BookFormModal from './BookFormModal';
import Carousel from 'react-bootstrap/Carousel';

// const SERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    if (this.props.auth0.isAuthenticated) {

      try {
        //get token
        const res = await this.props.auth0.getIdTokenClaims();
        console.log(res);
        const jwt = res.__raw;
        console.log(jwt)
        localStorage.setItem("jwt", jwt);
        const config = {
          method: 'get',
          baseURL: process.env.REACT_APP_SERVER,
          url: '/book',
          headers: {
            'Authorization': `Bearer ${jwt}`
          }
        }
        let results = await axios(config)

        // let results = await axios.get(`${SERVER}/book`);
        // // console.log(results)
        this.setState({
          books: results.data
        }
          // ,console.log(this.state.books)
        )
      } catch (error) {
        console.log('There was an error!:', error.response.data)
      }
    };

  }

  postBooks = async (newBook) => {
    try {
      //get token
      const res = await this.props.auth0.getIdTokenClaims();
      console.log(res);
      const jwt = res.__raw;
      console.log(jwt)
      localStorage.setItem("jwt", jwt);
      const config = {
        method: 'post',
        baseURL: process.env.REACT_APP_SERVER,
        url: '/book',
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        data: newBook
        
      }
      // let url = `${SERVER}/book`
      // const jwt = localStorage.getItem("jwt");
      let createdBook = await axios(config);
      console.log(createdBook.data);
      // this.getBooks();
      this.setState({
        books: [...this.state.books, createdBook.data]
      }, console.log('new status'))
    }
    catch (error) {
      console.log('ERR', error.response.data)
    }
  }

  // DELETE BOOK FUNCTION NEEDED
  // filter then setState to update the view

  deleteBooks = async (id) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      console.log(res);
      const jwt = res.__raw;
      console.log(jwt)
      localStorage.setItem("jwt", jwt);
      const config = {
        method: 'delete',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/book/${id}`,
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
      }
      // let url = `${SERVER}/book/${id}`;
      await axios(config);
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks,
      });
    } catch (err) {
      console.log('ERR,', err.response.data)
    }
  }

  updateBooks = async (bookToUpdate) => {
    try {
      const res = await this.props.auth0.getIdTokenClaims();
      console.log(res);
      const jwt = res.__raw;
      console.log(jwt)
      localStorage.setItem("jwt", jwt);
      const config = {
        method: 'put',
        baseURL: process.env.REACT_APP_SERVER,
        url: `/book/${bookToUpdate._id}`,
        headers: {
          'Authorization': `Bearer ${jwt}`
        },
        data: bookToUpdate
      }
      // let url = `${SERVER}/book/${id}`;
      await axios(config);

      // let url = `${SERVER}/book/${bookToUpdate._id}`;
      // console.log(url);
      let updatedBookFromDb = await axios(config);
      console.log(updatedBookFromDb.data)

      let updatedBooks = this.state.books.map((book) => {
        return book._id === bookToUpdate._id
          ? updatedBookFromDb.data
          : book;
      });
      this.setState({
        books: updatedBooks,
      });
    } catch (err) {
      console.log('CATCH FIRED!')
      console.log('ERR', err)
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {
    // console.log(this.state.books)
    let listItems = [];
    /* TODO: render all the books in a Carousel */
    listItems = this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}>
          <img
            className="d-block w-100"
            src="book-bg.jpg"
            alt="Books"
          />

          <Carousel.Caption>
            <h3>
              {book.title}
            </h3>
            <p>
              {book.description}
            </p>
            <p>
              {book.status}
            </p>

          </Carousel.Caption>
        </Carousel.Item>)
    });


    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {
          this.state.books.length ? (
            <Carousel>{listItems}</Carousel>
          ) : (
            <h3>No Books Found :( </h3>
          )
        }
        <BookFormModal
          books={this.state.books}
          postBooks={this.postBooks}
          deleteBooks={this.deleteBooks}
          updateBooks={this.updateBooks}
        />
      </>
    )
  }
}

export default withAuth0(BestBooks);
