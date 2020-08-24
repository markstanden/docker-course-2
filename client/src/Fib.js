import React, { useState } from 'react'
import axios from 'axios'

function Fib(props) {
  const [values, setValues] = useState([])
  const [seenIndexes, setSeenIndexes] = useState([])
  const [inputValue, setInputValue] = useState('')

  fetchValues()
  fetchIndexes()

  async function fetchValues() {
    const redisValues = await axios.get('/api/values/current')
    // console.log(dbValues.data)
    setValues(redisValues.data)
  }

  async function fetchIndexes() {
    const dbIndexes = await axios.get('/api/values/all')
    console.log('dbIndexes: ', dbIndexes)
    setSeenIndexes(dbIndexes.data)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const sendInputValue = parseInt(inputValue)
    //setInputValue('')
    try {
      await axios.post('/api/values', {
        index: sendInputValue,
      })
      /*       renderValues()
      renderSeenIndexes() */
    } catch (e) {
      console.log(e)
    }
  }

  function renderSeenIndexes() {
    const numberList = seenIndexes.map(({ number }) => number)
    console.log(numberList)
    return numberList.join(', ')
  }

  function renderValues() {
    const entries = []
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} - I calculated {values[key]}
        </div>
      )
    }
    return entries
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Enter your Index</label>
        <input name="inputValue" onChange={e => setInputValue(e.target.value)} autoFocus type="text" />
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
