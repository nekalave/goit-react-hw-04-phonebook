import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section/Section';
import ContactForm from './PhonebookPage/ContactForm/ContactForm';
import ContactsList from './PhonebookPage/ContactsList/ContactsList';
import Filter from './PhonebookPage/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    const duplicateContact = contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase());
    if (duplicateContact) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { name, number, id: nanoid() };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  }

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId)
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredContacts();
    return (
      <>
        <Section title='Phonebook'>
          <ContactForm handleSubmit={this.handleSubmit} />
        </Section>
        <Section title='Contacts'>
          <Filter filter={filter} handleChange={this.handleChange} />
          <ContactsList contacts={filteredContacts} handleDeleteContact={this.handleDeleteContact} />
        </Section>
      </>
    );
  }
}

export default App;
