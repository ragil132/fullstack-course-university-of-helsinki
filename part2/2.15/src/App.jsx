import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/personsServices'

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

    const nameObject = {
      name: newName,
      number: newNumber,
      id: Date.now().toString()
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName)

        if (person) {
          const id = person.id;
          const updatedPerson = { ...person, number: newNumber };

          personsServices.update(id, updatedPerson)
            .then((response) => {
              setPersons(persons.map(p => (p.id !== id ? p : response)));
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              console.error(`Error updating contact:`, error);
            });
        }
        return
      }
      return
    }

    personsServices.create(nameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })

  }

  useEffect(() => {
    personsServices.getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsServices.deletedata(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(error => {
          console.error(`Error deleting ${name}:`, error);
        });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />

    </div>
  )
}

export default App