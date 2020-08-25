import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Fib(props) {
  const [prevCalcValues, setPrevCalcValues] = useState('')
  const [seenIndexes, setSeenIndexes] = useState('')
  const [inputBoxValue, setInputBoxValue] = useState('')

  /** Get the currently sent and calculated values from the redis server */
  async function fetchValues() {
    console.log('fetching')
    const redisValues = await axios.get('/api/values/current')
    setPrevCalcValues(formatValues(redisValues.data))
  }

  /** Take the calculated value and produce formatted text */
  function formatValues(values) {
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

  /** Get the postgres stored indexes */
  async function fetchIndexes() {
    const dbIndexes = await axios.get('/api/values/all')
    setSeenIndexes(formatSeenIndexes(dbIndexes.data))
  }

  /** produce the formatted list of values to display on screen */
  function formatSeenIndexes(dbData) {
    //Take the number value from each record and create a new array of numbers
    const numberArray = dbData.map(({ number }) => number)
    // return a comma separated list for display purposes.
    return numberArray.join(', ')
  }

  const handleInputChange = inputText => setInputBoxValue(inputText)

  const handleSubmit = async event => {
    event.preventDefault()
    const sendInputValue = parseInt(inputBoxValue)
    setInputBoxValue('')
    try {
      await axios.post('/api/values', {
        index: sendInputValue,
      })
    } catch (e) {
      console.log(e)
    }

    // once the post has submitted refetch values
    fetchValues()
    fetchIndexes()
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label>Enter your Index</label>
        <input name="inputValue" onChange={e => handleInputChange(e.target.value)} autoFocus type="text" />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {seenIndexes}

      <h3>Calculated values</h3>
      {prevCalcValues}
    </div>
  )
}
export default Fib
