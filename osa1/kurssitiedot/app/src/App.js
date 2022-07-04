import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = (props) => {
  if (props.stats.all > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text="good" value ={props.stats.good} />
          <StatisticLine text="neutral" value ={props.stats.neutral} />
          <StatisticLine text="bad" value ={props.stats.bad} />

          <StatisticLine text="all" value ={props.stats.all} />
          <StatisticLine text="average" value ={props.stats.average} />
          <StatisticLine text="positive" value ={props.stats.positive + " %"} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = 100 * good / all
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average,
    positive: positive
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>Statistics</h1>
      <Statistics stats={stats} />
    </div>
  )
}

export default App