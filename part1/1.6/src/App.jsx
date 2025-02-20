import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleButton = (types) => {
    if (types == "good") {
      setGood((prev) => prev + 1)
    } else if (types == "neutral") {
      setNeutral((prev) => prev + 1)
    } else if (types == "bad") {
      setBad((prev) => prev + 1)
    } else {
      alert("not found")
    }

  }

  return (
    <div>
      <Header />
      <Button type={'good'} onClick={() => handleButton('good')} />
      <Button type={'neutral'} onClick={() => handleButton('neutral')} />
      <Button type={'bad'} onClick={() => handleButton('bad')} />

      <div>
        <h1>statistics</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li key={'good'}>good {good}</li>
          <li key={'neutral'}>neutral {neutral}</li>
          <li key={'bad'}>bad {bad}</li>
        </ul>
      </div>
    </div>
  )
}

export default App