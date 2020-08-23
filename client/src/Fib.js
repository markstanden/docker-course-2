import React, { useState } from 'react'
import axios from 'axios'

function Fib(props) {
  const [values, setValues] = useState([])
  const [seenIndexes, setSeenIndexes] = useState([])
  const [inputValue, setInputValue] = useState('')

  fetchValues()
  fetchIndexes()

  async function fetchValues() {
    const dbValues = await axios.get('/api/values/current')
    setValues(dbValues.data)
  }

  async function fetchIndexes() {
    const redisIndexes = await axios.get('/api/values/all')
    setSeenIndexes(redisIndexes.data)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await axios.post('/api/values', {
      index: parseInt(inputValue),
    })
    setInputValue('')
  }

  function renderSeenIndexes() {
    const numberList = seenIndexes.map(({ number }) => number)
    return numberList.join(', ')
  }

  function renderValues() {
    const entries = []
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      )
    }
    return entries
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Enter your Index</label>
        <input
          onChange={e => setInputValue(e.target.value)}
          autoFocus
          name="index"
          id="indexInput"
          type="text"
          placeholder=""
          autoComplete="off"
        />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}

      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  )
}
export default Fib
