const Person = ({ person, remove }) => {
    return (
        <>
        <p>{person.name} {person.number} <button onClick={remove}>delete</button></p>
        </>
    )
}

const Persons = ({ persons, filter, remove }) => {
    return (
        <>
            {persons
                .filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                .map(person => <Person key={person.id} person={person} remove={() => remove(person)} />)}
        </>
    )
}

export default Persons