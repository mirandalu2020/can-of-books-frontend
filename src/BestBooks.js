import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    const SERVER = process.env.REACT_APP_SERVER;
    try {
      let results = await axios.get(`${SERVER}/book`);
      console.log(results)
      this.setState({
        books: results.data
      }, console.log(this.state.books))

    } catch (error) {
      console.log('There was an error!:', error.response.data)
    }
  };

  componentDidMount() {
    this.getBooks();
  }

  render() {
    console.log(this.state.books)
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
      </>
    )
  }

}

export default BestBooks;
