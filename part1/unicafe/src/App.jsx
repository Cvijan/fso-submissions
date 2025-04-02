import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ value, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Feedback = ({ handleGood, handleBad, handleNeutral }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good" />
      <Button onClick={handleNeutral} text="neutral" />
      <Button onClick={handleBad} text="bad" />
    </div>
  )
}

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral
  if(total == 0){
    return (
      <div>
        <p>No feedback given yet</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="average" value={(good - bad) / total} />
          <StatisticLine text="positive" value={(good / total) * 100 + ' %'} />
        </tbody>
      </table>
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