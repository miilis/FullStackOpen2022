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
      <p>Number of exercises {sum_exercises(props.parts)}</p>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App