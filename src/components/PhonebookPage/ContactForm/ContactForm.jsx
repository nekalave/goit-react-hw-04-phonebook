import css from './ContactForm.module.css';
import { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.handleSubmit(this.state);
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;

    return (
      <form className={css.form} onSubmit={this.handleFormSubmit}>
        <label>
          Name
          <input type='text' name='name' value={name} onChange={this.handleChange} required />
        </label>
        <label>
          Number
          <input type="tel" name="number" value={number} onChange={this.handleChange} required />
        </label>
        <button className={css.submitButton} type='submit'>Add Contact</button>
      </form>
    );
  }
}

export default ContactForm;
