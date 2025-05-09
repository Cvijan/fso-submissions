const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req, res)
    ].join(' ')
  }))

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id == id)

    if(!person){
        return res.status(404).send()
    }

    return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id != id)

    res.status(204).send()
})

app.post('/api/persons', (req, res) => {
    if(!req.body.number){
        return res.status(400).send({ error:'Missing number field' })
    }
    if(!req.body.name){
        return res.status(400).send({ error:'Missing name field' })
    }
    if(persons.map(p => p.name).includes(req.body.name)){
        return res.status(400).send({ error:'name must be unique' })
    }

    const person = {
        id: Math.round(Math.random() * 1000000),
        number: req.body.number,
        name: req.body.name
    }

    persons = persons.concat(person)
    return res.status(201).send(person)
})

app.get('/info', (req, res) => {
    res.set('Content-Type', 'text/html')
    res.send(
        Buffer.from(
            `<p>Phonebook had info for ${persons.length} people</p>
             <p>${(new Date()).toString()}</p>
            `
        ))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
