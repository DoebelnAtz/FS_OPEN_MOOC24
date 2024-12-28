

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

function App() {
  return (
    <div className="App">
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
}

function Header({ course }) {
  return (
    <h1>{course.name}</h1>
  )
}

function Content({ course }) {
  const renderParts = course.parts.map(part => <Part part={part.name} exercises={part.exercises} />)
  return renderParts
}

function Part(props) {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

function Total({ course }) {
  return (
    <p>Number of exercises {course.parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
  )
}

export default App;
