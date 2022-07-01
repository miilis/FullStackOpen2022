const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      <p>
        <Part part={props.parts[0].name} exercise={props.parts[0].exercises} />
      </p>
      <p>
        <Part part={props.parts[1].name} exercise={props.parts[1].exercises} />
      </p>
      <p>
        <Part part={props.parts[2].name} exercise={props.parts[2].exercises} />
      </p>
    </>
  )
}
const Part = (props) => {
  return (
    <p>{props.part} {props.exercise}</p>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.num_exercises}</p>
    </>
  )
}

const sum_exercises = (parts) => {
  let total = 0
  parts.forEach(element => {
    total += element.exercises
  });
  return total
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  const parts = [part1, part2, part3]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total num_exercises={sum_exercises(parts)} />
    </div>
  )
}

export default App