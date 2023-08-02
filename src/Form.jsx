import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [newInput, setNewInput] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [result, setResult] = useState("")

  const handleTextchange = (e) => {
    setNewInput(e.target.value)
    setResult("")
  }

  const handleSelectChange = (e) => {
    setSelectOption(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const numbers = newInput.split(",").map((num) => parseInt(num.trim(), 10));

    if (numbers.some(isNaN)) {
      setResult("Invaild input.");
      return;
    } 
    
    switch(selectOption) {
      case "sum":
        setResult(sum(numbers));
        break;
      case "average":
        setResult(average(numbers));
        break;
      case "mode":
        setResult(mode(numbers));
        break;
      default:
        setResult("No operation selected.");
    }

    setNewInput([]);
    setSelectOption("");
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
      {}
    );
    let maxCount = Math.max(...Object.values(counts));
    let mode = Object.keys(counts).find((key) => counts[key] === maxCount);
    return parseInt(mode, 10);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input id="values" name="values" type="text" value={newInput} onChange={handleTextchange} htmlfor="operation" />
        <select id="operation" name="operation" value={selectOption} onChange={handleSelectChange}>
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
