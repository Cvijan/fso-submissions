const Filter = ({ term, action }) => {
    return (
        <div>
        filter shown with
        <input value={term} onChange={(e) => action(e.target.value)} />
      </div>
    )
}

export default Filter