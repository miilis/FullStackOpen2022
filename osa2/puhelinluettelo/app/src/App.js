import { useState, useEffect } from 'react'
import personsService from "./services/persons"

const Person = ({person, deletePerson}) => {
  return (
    <p>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button> </p>
  )
}

const Persons = ({persons, filter, deletePerson}) => {
  if (filter) {
    const personsFiltered = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    persons = personsFiltered
  }
  
  return (
    <div>
      {persons.map((person) =>
        <Person key={person.name} person={person} deletePerson={deletePerson}/>
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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const url = 'http://localhost:3001/persons'

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

  const deletePerson = (person) => {
    if(window.confirm(`Delete ${person.name} ?`)) {
      console.log(`delete ${person.id}`);
      personsService
        .deleteId(person.id)
        .then(response => {
          console.log(response)
          console.log(`deleted ${person.id}`)
        setPersons(persons.filter(personToMap => {
          return personToMap.id !== person.id}
          ))
        })
        .catch(error =>
          console.log('delete fail')
        )
    }
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
      personsService
        .create(nameObject)
        .then(response =>
          setPersons(persons.concat(response.data))
        )
        .catch(error =>
          console.log('fail')
        )
    }
    setNewName('')
    setNewNumber('')
  }

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange} />

      <h2>add new</h2>

      <PersonForm addNewName={addNewName} newName={newName} handleNewNameChange={handleNewNameChange} newNumber ={newNumber} handleNewNumberChange={handleNewNumberChange} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={newFilter} deletePerson={deletePerson}/>

    </div>
  )

}

export default App