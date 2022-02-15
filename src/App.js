import { useState, useEffect } from 'react';
import Container from './component/Container/Container';
import ContactForm from './component/ContactForm/ContactForm';
import Filter from './component/Filter/filter';
import ContactList from './component/ContactList/ContactList';
import shortid from 'shortid';

export default function App() {

  const [contacts, setContact] = useState(() => {
    return JSON.parse(localStorage.getItem('contact')) ?? [];
  });

  useEffect(() => {
    window.localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);

  const [filter, setFilter] = useState('');
  
  // Добавляет контакт 
    const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

  // Проверка на дубликат
    if (contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    )
    ) {
      alert(`${name} is already on contacts`);
    } else {
    setContact(prevContact => [contact, ...prevContact]
    )};
  };
 

    // Удаляет контакт
    const deleteContact = contactId => {
    setContact(contacts.filter(({ id }) => id !== contactId));
    }; 

     // Следит за полем фильтрации и пишет в стейт
   const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };
  const getVisibleTodos = () => {
    const normalizedFilter = filter.toLowerCase();
  return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  }
  const visibleTodos = getVisibleTodos();
  console.log(visibleTodos);

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleTodos}
          onDeleteContact={deleteContact}
        />
      </Container>
    );
    
}
