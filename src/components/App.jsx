import React, { Component } from 'react';
import ContactForm from './ContactForms/ContactForm';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  // ---------------- забираємо те що в localStorage

  componentDidMount() {
    console.log('didmount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    if (!parsedContacts) {
      Notiflix.Notify.success('No contacts found. Add contacts. ', {
        timeout: 3000,
      });
    }
  }
  // ---------------------------
  // ----------------запис в localStorage

  componentDidUpdate(prevProps, prevState) {
    console.log('object');
    console.log(prevState);
    console.log(this.state);
    if (this.state.contacts !== prevState.contact) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  // ---------------------------

  addContact = contact => {
    const id = nanoid();
    const { name } = contact;

    if (
      this.state.contacts.filter(contact => contact.name === name).length > 0
    ) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, ...contact }],
    }));
  };

  deleteItem = id => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts.filter(item => item.id !== id)],
    }));
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };
  onFilterChange = e => {
    const filter = e.target.value;
    this.setState({ filter: filter.toLowerCase() });
  };

  render() {
    return (
      <>
        <div>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContact} />
          <h2>Contacts</h2>
          <Filter onChange={this.onFilterChange} />
          <ContactList
            onDelete={this.deleteItem}
            items={this.getFilteredContacts()}
          />
        </div>
      </>
      // <div
      //   style={{
      //     height: '100vh',
      //     display: 'flex',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //     fontSize: 40,
      //     color: '#010101',
      //   }}
      // >
      //   React template
      // </div>
    );
  }
}

export default App;
