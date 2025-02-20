import { useState } from 'react'
import Header from './components/Header'
import Button from './components/Button'
import Result from './components/Result'

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

      {total != 0 ?
        (<Result results={[{
          name: "good",
          total: good
        }, {
          name: 'neutral',
          total: neutral
        }, {
          name: 'bad',
          total: bad
        }]} total={total} realVal={realVal} good={good} />) :
        (<div>
          <h1>statistics</h1>
          <p>No feedback given</p>
        </div>)
      }
    </div>
  )
}

export default App