import { useState } from 'react'

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const numAnecdotes = anecdotes.length;
  const [points, setPoints] = useState(Array(numAnecdotes).fill(0))

  const select_random_anecdote = (min, max) => {
    let random = getRndInteger(min, max)
    setSelected(random)
  }

  const addVote = (selected) => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const mostPoints = points.indexOf(Math.max(...points))

  return (
    <>
      <h1>
        Anecdote of the day
      </h1>

      <div>
        {anecdotes[selected]}
      </div>

      <div>
        has {points[selected]} votes
      </div>

      <button onClick={() => addVote(selected)}>
        vote
      </button>

      <button onClick={() => select_random_anecdote(0, numAnecdotes-1)}>
        next anecdote
      </button>
      
      <h1>
        Anecdote with most votes
      </h1>

      <div>
        {anecdotes[mostPoints]}
      </div>
    </>
  )
}

export default App