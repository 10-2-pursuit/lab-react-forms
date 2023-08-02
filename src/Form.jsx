import React, { useState } from "react";
import "./Form.css";





function Form() {

  const [input, setInput] = useState("")
  const [doMath, setdoMath] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")

  const findTotal = (arr) => {
    let sum = arr.reduce((add, sum) => Number(add) + Number(sum), 0)
    return sum
  }

  const findAverage = (arr) => {
    return (findTotal(arr)/arr.length)
  }

  const findMode = (arr) => {
    let numberKeys = {}
    let currentMode = arr[0]
    
    for (let num of arr) {
      if(!numberKeys[num]){
        numberKeys[num] = 1
      } else {
        numberKeys[num] += 1
      }
    }

    for (let key of Object.keys(numberKeys)){
      if (numberKeys[key] > numberKeys[currentMode]){
        currentMode = key
      }
    }
    return currentMode
  }

const validateInput = (arr) => {
  if(arr.length === 0) {
    return false
  }
  //replace with .any
  for (let input of arr) {
    if(isNaN(Number(input))){
       return false
    }
  }
  return true
}

  const handleSubmit = (e) => {
    e.preventDefault()
    let newArr = input.split(",")
    if(validateInput(newArr)){
      switch(doMath){
        case 'sum':
          setResult(findTotal(newArr))
          break;
        case 'average':
          setResult(findAverage(newArr))
          break;
        case 'mode':
          setResult(findMode(newArr))
          break;
        default:
          setError("error")
          setResult("Invalid input.")
      }
      setError("")
      setInput("")
    } else {
      setError("error")
      setResult("Invalid input.")
    }
  }

  const handleTextChange = (e) => {
    setInput(e.target.value)
  }

  const handleSelectChange = (e) => {
    setdoMath(e.target.value)

  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className={error} value={input} onChange={handleTextChange} id="values" name="values" type="text" />
        <select className={error} onChange={handleSelectChange} id="operation" name="operation">
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
