import Header from "./components/Header"
import Content from "./components/Content"
import Total from "./components/Total"

const App = () => {
  const course = 'Half Stack application development'

  const exercises = [
    { 'name': 'Fundamentals of React', 'number': 10 },
    { 'name': 'Using props to pass data', 'number': 7 },
    { 'name': 'State of a component', 'number': 14 },
  ]

  return (
    <div>
      <Header course={course} />
      <Content exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

export default App