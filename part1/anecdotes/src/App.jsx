import { useState } from 'react'

const DisplayBestAnecdote = ({ anecdotes, votes }) => {
  let index = 0
  votes.forEach((vote, i) => {
    if(vote > votes[index])
      index = i
  })

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[index]}
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(_ => 0))

  const selectRandomQuote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length)

    setSelected(rand)
  }

  const voteForSelectedQuote = () => {
    const tmp = [...votes]
    tmp[selected] = tmp[selected] + 1

    setVotes(tmp)
  }

  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <br />
      <button onClick={() => voteForSelectedQuote()}>vote</button>
      <button onClick={() => selectRandomQuote()}>random</button>

      <DisplayBestAnecdote anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App