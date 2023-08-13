import React from "react";
import "./Form.css";
import { useState } from "react";

function Form() {
  const [input, setInput] = useState("");
  const [select, setSelect] = useState("");
  const [output, setOutput] = useState("")

  const textHandler = (e) => {
    setInput(e.target.value)
    setOutput("")
  }

  const selectHandler = (e) => {
    setSelect(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const numbers = input.split(",").map((num) => parseInt(num.trim(), 10));

    if (numbers.some(isNaN)) {
      setOutput("Input is Invalid.");
      return;
    } 

    switch(select) {
      case "sum":
        setOutput(sum(numbers));
        break;
      case "average":
        setOutput(average(numbers));
        break;
      case "mode":
        setOutput(mode(numbers));
        break;
      default:
        setOutput("No operation selected.");
    }

    setInput([]);
    setSelect("");
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
     <form onSubmit={submitHandler}>
        <input id="values" name="values" type="text" value={input} onChange={textHandler} htmlfor="operation" />
        <select id="operation" name="operation" value={select} onChange={selectHandler}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
        </select>
          <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{output}</p>
      </section>
    </>
  )
}
export default Form