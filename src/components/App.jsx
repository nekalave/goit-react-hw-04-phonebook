import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './PhonebookPage/ContactForm/ContactForm';
import ContactsList from './PhonebookPage/ContactsList/ContactsList';
import Filter from './PhonebookPage/Filter/Filter';

const App = () => {

  const [contacts, setContacts] = useState(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    return storedContacts || [];
  });

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    console.log(storedContacts);
    if (storedContacts) {
      setContacts(() => storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ name, number }) => {
    const duplicateContact = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { name, number, id: nanoid() };
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const [filter, setFilter] = useState('');
  const handleChange = evt => {
    const { value } = evt.target;
    setFilter(value);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const handleDeleteContact = contactId => {
    setContacts(prevState => (
      prevState.filter(contact => contact.id !== contactId)
    ));
  };

  return (
    <>
      <Section title='Phonebook'>
        <ContactForm handleSubmit={handleSubmit} />
      </Section>
      <Section title='Contacts'>
        <Filter filter={filter} handleChange={handleChange} />
        <ContactsList contacts={getFilteredContacts()} handleDeleteContact={handleDeleteContact} />
      </Section>
    </>
  );
};

export default App;
