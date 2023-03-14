import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Container, ListGroup} from 'react-bootstrap';


// const SERVER = process.env.REACT_APP_SERVER;
class BookFormModal extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      addBook: false,
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description:e.target.description.value,
      status: e.target.status.value
    }
    this.props.postBooks(newBook)
  }

  handleAddBookClick = (e) => {
    e.preventDefault();
    this.setState({
      addBook: true,
    })
    
  }



render() {
  let books = this.props.books.map((book) => (
    <Book key={book._id} book={book} 
    deleteBooks={this.props.deleteBooks}
    />
  ));
  return (
    <Container>
      <ListGroup>
        {books}
      </ListGroup>

      
        
      <Form onSubmit={this.handleBookSubmit}>
      {this.state.addBook === true &&
        <><Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group><Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" />
            </Form.Group><Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" />
            </Form.Group></>
      }
        <Button type="submit" onClick={this.handleAddBookClick}>Add Book</Button>
      </Form>
    </Container>
  )
}
}

class Book extends React.Component {
  render() {
    return (
      <ListGroup.Item>
      {this.props.book.title} is {this.props.book.status}
      <Button 
        variant='dark' 
        onClick={() => this.props.deleteBooks(this.props.book._id)}
      >
        Delete Book
      </Button>
    </ListGroup.Item>
    )
  }
}

export default BookFormModal;
