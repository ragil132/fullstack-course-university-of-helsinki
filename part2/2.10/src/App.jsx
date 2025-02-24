import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: 0,
      id: Date.now()
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const addName = (e) => {
    e.preventDefault()

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: Date.now()
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} />

    </div>
  )
}

export default App