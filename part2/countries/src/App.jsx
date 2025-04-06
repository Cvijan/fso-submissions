import { useEffect } from "react"
import { useState } from "react"
import countryService from './services/countryService'
import DisplaySearchResults from './DisplaySearchResults'


function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(data => {
        setCountries(data)
      })
  }, [])


  return (
    <div>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      <DisplaySearchResults countries={countries.filter(c => c.name.common.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))}/>
    </div>
  )
}

export default App
