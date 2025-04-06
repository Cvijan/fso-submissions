import { useEffect, useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import Persons from './Persons'
import phonebookService from './services/phonebookService'
import Notification from './Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const showNotification = (message, type, time) => {
    setNotification({ message, type })

    setTimeout(() => {
      setNotification(null)
    }, time)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const existingPerson = persons.find(person => person.name == newName)

    if(existingPerson){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService.updateEntry(existingPerson.id, { ...existingPerson, number: newPhoneNumber })
                        .then(data => {
                          setPersons(persons.map(p => p.id == data.id ? data : p))
                          showNotification(`Updated ${data.name}`, 'success', 5000)
                        })
                        .catch(() => {
                          showNotification(`Information of ${existingPerson.name} has already been removed from server`, 'error', 5000)
                          setPersons(persons.filter(p => p.id != existingPerson.id))
                        })
      }

      setNewName('')
      setNewPhoneNumber('')
      return
    }

    let newEntry = { name: newName, number: newPhoneNumber }

    phonebookService
      .createEntry(newEntry)
      .then(data => {
        setPersons([...persons, data])
        showNotification(`Added ${data.name}`, 'success', 5000)
      })

    
    setNewName('')
    setNewPhoneNumber('')
  }

  const deletePerson = (person) => {
    if(!confirm(`Delete ${person.name} ?`))
      return

    phonebookService.deleteEntry(person.id)
      .then(data => {
        showNotification(`Deleted ${data.name}`, 'success', 5000)
      })
      .catch(() => {
        showNotification(`Information of ${person.name} has already been removed from server`, 'error', 5000)
        setPersons(persons.filter(p => p.id != person.id))
      })

    setPersons(persons.filter(p => p.id != person.id))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
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
      <Persons persons={persons} filter={filter} remove={deletePerson} />
    </div>
  )
}

export default App