import './Fib.css'
import React, { useState } from 'react'
import axios from 'axios'

function Fib(props) {
  const [prevCalcValues, setPrevCalcValues] = useState('')
  const [seenIndexes, setSeenIndexes] = useState('')
  const [inputBoxValue, setInputBoxValue] = useState('')

  /** Get the currently sent and calculated values from the redis server */
  async function fetchValues() {
    const redisValues = await axios.get('/api/values/current')
    setPrevCalcValues(formatValues(redisValues.data))
  }

  /** Take the calculated value and produce formatted text */
  function formatValues(values) {
    const entries = []
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} --- I calculated {values[key]}
        </div>
      )
    }
    return entries
  }

  /** Get the stored indexes from the api */
  async function fetchIndexes() {
    // request indexes from api
    const dbIndexes = await axios.get('/api/values/all').catch(error => console.log(error))
    // strip and format
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
    // don't refresh page
    event.preventDefault()

    // very basic validation
    const sendInputValue = parseInt(inputBoxValue)

    if (sendInputValue) {
      setInputBoxValue('')
      try {
        await axios.post('/api/values', {
          index: sendInputValue,
        })
      } catch (e) {
        console.log(e)
      }
    } else {
      console.log('Index must be a number')
    }

    // once the post has submitted refetch values
    fetchValues()
    fetchIndexes()
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <label className="fib_form_label">
          <p>Enter your Index : </p>
        </label>
        <div className="fib_input_wrapper">
          <input
            className="fib_form_input"
            name="inputValue"
            onChange={e => handleInputChange(e.target.value)}
            autoFocus
            type="text"
          />
          <button className="fib_form_button"> Submit </button>
        </div>
      </form>
      <div className="fib_display_indexes">
        <h3>Indexes I have seen : </h3>
        {seenIndexes}
      </div>
      <div className="fib_display_calc-values">
        <h3>Calculated values : </h3>
        {prevCalcValues}
      </div>
    </div>
  )
}
export default Fib
