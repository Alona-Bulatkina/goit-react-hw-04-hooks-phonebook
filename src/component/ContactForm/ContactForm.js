import { useState } from 'react';
import PropTypes from 'prop-types';

import { Label, Input, Form, Button } from './ContactForm.styled';

function ContactForm({ onSubmit}) {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // Метод, наблюдающий за инпутами и записывающий в стейт их значения
  const hanldeChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    };
  };

  // Метод на отправке формы. Формирует из стейта контакт и передает во внешний метод
  const hanldeSubmit = event => {
    event.preventDefault();
    onSubmit(name, number);
    resetInput();
  };

  const resetInput = () => {
    setName('');
    setNumber('');
  };
 
    return (
      <Form onSubmit={hanldeSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name} // Пишем значение в стейт
            onChange={hanldeChange} // Наблюдающий метод
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number} // Пишем значение в стейт
            onChange={hanldeChange} // Наблюдающий метод
            pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
            title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
            required
          />
        </Label>
        <div>
          <Button type="submit">
            Add contact
          </Button>
        </div>
      </Form>
    );
  }
  
  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

export default ContactForm;