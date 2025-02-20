import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const [realVal, setRealVal] = useState(0)

  const handleButton = (types) => {
    if (types == "good") {
      setGood((prev) => prev + 1)
      setRealVal((prev) => prev + 1)
    } else if (types == "neutral") {
      setNeutral((prev) => prev + 1)
    } else if (types == "bad") {
      setBad((prev) => prev + 1)
      setRealVal((prev) => prev - 1)
    } else {
      alert("not found")
    }

    setTotal((prevTotal) => prevTotal + 1)
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
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <li key={'all'}>all {total}</li>
            <li key={'avg'}>average {(realVal / total)}</li>
            <li key={'positive'}>positive {(good / total) * 100} %</li>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App