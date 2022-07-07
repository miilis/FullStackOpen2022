import { useState } from 'react'

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map((person) =>
        <p key={person.name}>{person.name}</p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewNameChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value)    
  }
  
  const addNewName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName
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
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
    </div>
  )

}

export default App