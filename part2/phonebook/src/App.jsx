import { useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')


  const addPerson = (e) => {
    e.preventDefault()

    if(persons.some(person => person.name == newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewPhoneNumber('')
      return
    }
  
    setPersons([...persons, { name: newName, number: newPhoneNumber }])
    setNewName('')
    setNewPhoneNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter term={filter} action={setFilter} />
      
      <h2>add  a new</h2>
      <Form 
        action={addPerson} 
        fields={
          [
            { name: 'name', value: newName, setValue: setNewName },
            { name: 'number', value: newPhoneNumber, setValue: setNewPhoneNumber }
          ]
        } 
      />

      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App