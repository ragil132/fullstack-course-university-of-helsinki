import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsServices from './services/personsServices'
import Notification from './components/Notification'

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
  const [message, setMessage] = useState({
    message: null,
    type: null
  });


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
              setMessage({
                message: `${newName}'s number is changed`,
                type: 'success'
              })
              setPersons(persons.map(p => (p.id !== id ? p : response)));
              setNewName('');
              setNewNumber('');
            })
            .catch(error => {
              setMessage({
                message: `Information of ${newName} has already been removed from server`,
                type: 'error'
              })
              console.error(`Error updating contact:`, error);
              personsServices.getAll()
                .then(response => {
                  setPersons(response)
                })
            });
        }
        return
      }
      return
    }

    personsServices.create(nameObject)
      .then(response => {
        setMessage({
          message: `Added ${newName}`,
          type: 'success'
        })
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        setMessage({
          message: `Error add ${newName}`,
          type: 'error'
        })
        console.error(`Error:`, error);
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
          setMessage({
            message: `Error deleting ${newName}`,
            type: 'error'
          })
          console.error(`Error deleting ${name}:`, error);
        });
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />

      <h2>Add a new</h2>

      <PersonForm addName={addName} newName={newName} handleChangeName={handleChangeName} newNumber={newNumber} handleChangeNumber={handleChangeNumber} />

      <h2>Numbers</h2>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />

    </div>
  )
}

export default App