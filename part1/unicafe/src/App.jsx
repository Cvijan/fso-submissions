import { useState } from 'react'

const Feedback = ({ handleGood, handleBad, handleNeutral }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback 
        handleGood={() => setGood(good + 1)} 
        handleBad={() => setBad(bad + 1)} 
        handleNeutral={() => setNeutral(neutral + 1)} 
      />
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
      />
    </div>
  )
}

export default App