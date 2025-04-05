const Field = ({ field }) => {
    return (
        <div>
            {field.name}: <input value={field.value} onChange={(e) => field.setValue(e.target.value)} />
        </div>
    )
}

const Form = ({ action, fields }) => {
    return (
        <form onSubmit={action}>
            {fields.map(field => <Field key={field.name} field={field} />)}
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default Form