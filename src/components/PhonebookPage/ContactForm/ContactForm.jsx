import css from './ContactForm.module.css';
import { useState } from 'react';

const ContactForm = ({handleSubmit}) => {
    const [inputValue, setInputValue] = useState({name:'', number: ''})

    const handleChange = evt => {
      const { name, value } = evt.target;
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
      }));
    };

    const handleFormSubmit = evt => {
      evt.preventDefault();
      handleSubmit(inputValue)
      setInputValue({name:'', number: ''})
    }

    return (
      <form className={css.form} onSubmit={handleFormSubmit}>
        <label>
          Name
          <input type='text' name='name' value={inputValue.name} onChange={handleChange} required />
        </label>
        <label>
          Number
          <input type="tel" name="number" value={inputValue.number} onChange={handleChange} required />
        </label>
        <button className={css.submitButton} type='submit'>Add Contact</button>
      </form>
    );

}

export default ContactForm;
