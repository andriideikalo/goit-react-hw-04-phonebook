import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForms/ContactForm';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';

const localStorageContacts = () =>
  JSON.parse(localStorage.getItem('contacts')) ?? [];

export default function App() {
  const [contacts, setContacts] = useState(localStorageContacts);
  const [filter, setFilter] = useState('');

  const onFilterChange = e => {
    setFilter(e.target.value).toLowerCase();
  };

  const addContact = contact => {
    const id = nanoid();
    const { name } = contact;

    if (contacts.filter(contact => contact.name === name).length > 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      { id, name, number: contact.number },
    ]);
  };

  const getFilteredContacts = () => {
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  const deleteItem = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    console.log('Notiflix');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (!parsedContacts) {
      Notiflix.Notify.success('No contacts found. Add contacts. ', {
        timeout: 3000,
      });
    }
  }, [contacts]);

  useEffect(() => {
    console.log('didmount');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <>
        <div className="form">
          <h1>Phonebook</h1>
          <ContactForm onSubmit={addContact} />
          <h2>Contacts</h2>
          <Filter onChange={onFilterChange} />
          <ContactList onDelete={deleteItem} items={getFilteredContacts()} />
        </div>
      </>
    </div>
  );
}
