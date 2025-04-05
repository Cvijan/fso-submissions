import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
                .then(res => res.data)
}

const createEntry = (person) => {
    return axios.post(baseUrl, person)
                .then(res => res.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
                .then(res => res.data)
}

const updateEntry = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
                .then(res => res.data)
}


export default { getAll, createEntry, deleteEntry, updateEntry }