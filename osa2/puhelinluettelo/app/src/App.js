import { useState } from 'react'

const Person = ({person}) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({persons, filter}) => {
  if (filter) {
    const personsFiltered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    persons = personsFiltered
  }
  
  return (
    <div>
      {persons.map((person) =>
        <Person key={person.name} person={person}/>
      )}
    </div>
  )
}

const Filter = ({newFilter, handleNewFilterChange}) => {
  return (
    <div>
      filter show with: <input value={newFilter} onChange={handleNewFilterChange} />
    </div>
  )
}

const PersonForm = ({addNewName, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNewNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleNewNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value)    
  }

  const handleNewNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber(event.target.value)    
  }

  const handleNewFilterChange = (event) => {
    // console.log(event.target.value);
    setNewFilter(event.target.value)    
  }
  
  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    const isMultiple = persons.filter(person =>
      person.name === newName  
    )
    if (isMultiple.length) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange} />

      <h2>add new</h2>

      <PersonForm addNewName={addNewName} newName={newName} handleNewNameChange={handleNewNameChange} newNumber ={newNumber} handleNewNumberChange={handleNewNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter}/>

    </div>
  )

}

export default App