import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Grid, Image, Segment } from 'semantic-ui-react';
import InlineMessage from '../messages/InlineError';

class BookForm extends Component {

  state = {
    data: {
      goodreadsId: this.props.book.goodreadsId,
      title: this.props.book.title,
      authors: this.props.book.authors,
      cover: this.props.book.covers[0],
      pages: this.props.book.pages
    },
    covers: this.props.book.covers,
    index: 0,
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    this.setState({
      data: {
        goodreadsId: props.book.goodreadsId,
        title: props.book.title,
        authors: props.book.authors,
        cover: props.book.covers[0],
        pages: props.book.pages
      },
      covers: props.book.covers
    })
  }

  onChange = e => {
    this.setState({ 
      ...this.state, 
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  }

  onChangeNumber = e => {
    this.setState({ 
      ...this.state, 
      data: { ...this.state.data, [e.target.name]: parseInt(e.target.value, 10) }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    if(Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props.submit(this.state.data)
        .catch(err => 
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    } else {
      this.setState({ errors })
    }
  }

  validate = data => {
    const errors = {};
    if(!data.title) errors.title = "Can't be blank";
    if(!data.authors) errors.authors = "Can't be blank";
    if(!data.pages) errors.pages = "Can't be blank";
    return errors;
  }

  changeCover = () => {
    const { index, covers } = this.state;
    const newIndex = index + 1 >= covers.length ? 0 : index + 1;
    this.setState({ 
      index: newIndex,
      data: {
        ...this.state.data,
        cover: covers[newIndex]
      }
     })
  }

  render(){
    const { loading, errors, data } = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onSubmit} loading={loading}>
          <Grid columns={2} stackable>
            <Grid.Row>
              <Grid.Column>
                <Form.Field error={!!errors.title} >
                  <label htmlFor='title'>Title</label>
                  <input 
                    type='text'
                    id='title'
                    placeholder='title of book'
                    name='title'
                    value={data.title}
                    onChange={this.onChange}
                  />
                  { errors.title && <InlineMessage text={errors.title} />}
                </Form.Field>
                <Form.Field error={!!errors.authors} >
                  <label htmlFor='authors'>Book Authors</label>
                  <input 
                    type='text'
                    id='authors'
                    placeholder='Authors'
                    name='authors'
                    value={data.authors}
                    onChange={this.onChange}
                  />
                  { errors.authors && <InlineMessage text={errors.authors} />}
                </Form.Field>
                <Form.Field error={!!errors.pages} >
                  <label htmlFor='pages'>Book pages</label>
                  <input 
                    type='number'
                    id='pages'
                    name='pages'
                    value={data.pages}
                    onChange={this.onChangeNumber}
                  />
                  { errors.pages && <InlineMessage text={errors.pages} />}
                </Form.Field>
              </Grid.Column>
              <Grid.Column>
                <Image size='small' src={data.cover} />
                { this.state.covers.length > 1 && <a 
                    role='button' 
                    tabIndex={0} 
                    onClick={this.changeCover}
                  >Another cover</a> 
                }
              </Grid.Column>
            </Grid.Row>
          <Button primary>Save</Button>
          </Grid>
        </Form>
      </Segment>
    )
  }
}

BookForm.propTypes = {
  submit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    goodreadsId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired,
    cover: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    pages: PropTypes.number.isRequired
  }).isRequired
}

export default BookForm;