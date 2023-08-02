import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [newInput, setNewInput] = useState([])
  const [selectOption, setSelectOption] = useState("")

  const handleTextchange = (e) => {
    setNewInput([e.target.value])
  }

  const handleSelectChange = (e) => {
    setSelectOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewInput([])
    setSelectOption("")
  }

  const sum = (numbers) => {
    return numbers.reduce((a,b)=> a + b, 0);
  }

  const average = (numbers) => {
    return sum(numbers)/numbers.length;
  }

  const mode = (numbers) => {
    let counts = numbers.reduce(
      (acc, value) => ({ ...acc, [value]: (acc[value] || 0) + 1 }),
      {});
      let maxCount = Math.max(...Object.values(counts));
      let mode = Object.keys(counts).find(key => counts[key] === maxCount);
      return mode;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="values" name="values" type="text" value={newInput} onChange={handleTextchange} htmlfor="operations" />
        <select id="operation" name="operation" value={selectOption} onChange={handleSelectChange}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p></p>
      </section>
    </>
  );
}

export default Form;
