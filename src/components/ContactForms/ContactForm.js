import { PropTypes } from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { FormStyled } from './ContactFormStyled';
import { InputStyled } from './ContactFormStyled';
import { LabelStyled } from './ContactFormStyled';
import { BottonStyled } from './ContactFormStyled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func,
  };

  nameId = nanoid();
  numberId = nanoid();

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    e.target.reset();
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <>
        <FormStyled name="contact" onSubmit={this.handleSubmit}>
          <LabelStyled htmlFor={this.nameId}>Name</LabelStyled>
          <InputStyled
            value={name}
            onChange={this.handleChange}
            id={this.nameId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />

          <LabelStyled htmlFor={this.numberId}>Number</LabelStyled>
          <InputStyled
            value={number}
            onChange={this.handleChange}
            id={this.numberId}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />

          <BottonStyled type="submit">Add contact</BottonStyled>
        </FormStyled>
      </>
    );
  }
}

export default ContactForm;
