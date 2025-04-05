const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons, filter }) => {
    return (
        <>
            {persons
                .filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
                .map(person => <Person key={person.name} person={person} />)}
        </>
    )
}

export default Persons