import { useState } from 'react'

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
      filter shown with <input value={searchQuery} onChange={handleSearchQuery} />
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person =>
          <li key={person.id}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}

export default App