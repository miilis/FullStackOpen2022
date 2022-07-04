import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = (good - bad)/all
  let positive = 100 * good / all

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <h1>Statistics</h1>

      <div>good {good} </div>
      <div>neutral {neutral} </div>
      <div>bad {bad} </div>
      <div>all {all} </div>
      <div>average {average} </div>
      <div>positive {positive + " %"} </div>
    </div>
  )
}

export default App