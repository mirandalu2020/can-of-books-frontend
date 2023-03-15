import React from 'react';
import Form from 'react-bootstrap/Form';
import {Button, Container, ListGroup, Modal} from 'react-bootstrap';


// const SERVER = process.env.REACT_APP_SERVER;
class BookFormModal extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      addBook: false,
      showModal: false,
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
    let newBook = {
      title: e.target.title.value,
      description:e.target.description.value,
      status: e.target.status.value,
    }

    this.props.postBooks(newBook);
    console.log(newBook);
  }

  handleShow = (e) => {
    e.preventDefault();
    this.setState({
      addBook: true,
      showModal:true,
    })
  }

  handleHide = () => {
    this.setState({
      showModal:false,
    })
  }



render() {
  let books = this.props.books.map((book) => (
    <Book 
    key={book._id} 
    book={book}
    deleteBooks={this.props.deleteBooks}
    updateBooks={this.props.updateBooks}
    />
  ));

  return (
    <Container>
      <ListGroup>
        {books}
      </ListGroup>

      <>
      {/* ----------------Delete book form modal-------------------------- */}
      <Button variant="primary" onClick={this.handleShow}>
        Add Book
      </Button>
      <Modal show={this.state.showModal} onHide={this.handleHide}>
        <Modal.Header closeButton>
          <Modal.Title>Add A Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" />
            </Form.Group><Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    </Container>
  )
}
}

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false
    }
  }

  handleUpdateBookSubmit = (e) => {
    e.preventDefault();
    let bookToUpdate = {
      title: e.target.title.value || this.props.book.title,
      description:e.target.description.value || this.props.book.description,
      status: e.target.status.value || this.props.book.status,

      _id: this.props.book._id,
      // !!!version "__v" has 2 underscores!!!
      __v: this.props.book.__v
    }

    this.props.updateBooks(bookToUpdate);
    console.log(bookToUpdate);
  }

  showUpdateForm = (e) =>{
    e.preventDefault();
    this.setState({
      showUpdateForm: true
    })
  }

  handleHide = (e) => {
    this.setState({
      showUpdateForm: false,
    })
  }
  
  render() {
    return (
      <ListGroup.Item>
        {this.props.book.title} is {this.props.book.status}

      <Button
        variant='warning'
        onClick={this.showUpdateForm} >
        Update Book
      </Button>

      <Modal
        size="sm"
        show={this.state.showUpdateForm}
        onHide={this.handleHide}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Update your fav
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.handleUpdateBookSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="description">
              <Form.Label>description</Form.Label>
              <Form.Control type="text" />
            </Form.Group><Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
      <Button
        variant='danger'
        onClick={() => this.props.deleteBooks(this.props.book._id)}>
          Delete Book
        </Button>
    </ListGroup.Item>
    )
  }
}

export default BookFormModal;
