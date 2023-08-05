import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValues, setInputValues] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [result, setResult] = useState("");

  const handleInputchange = (e) => {
    setInputValues(e.target.value);
  };

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const numbers = inputValues.split(",").map((num) => parseFloat(num.trim()));

    if (numbers.some(isNaN)) {
      setResult(`Invalid input.`);
      return;
    }
    let calculatedResults;
    switch (selectedOperation) {
      case "sum":
        calculatedResults = numbers.reduce((acc, curr) => acc + curr, 0);
        break;
      case "average":
        calculatedResults =
          numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
        break;
      case "mode":
        const frequencyMap = {};
        numbers.forEach((num) => {
          frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        });
        let maxFrequency = 0;
        let mode = null;
        for (const num in frequencyMap) {
          if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            mode = num;
          }
        }
        calculatedResults = mode;
        break;

      default:
        calculatedResults = "";
        break;
    }
    setResult(calculatedResults);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input
          id="values"
          name="values"
          type="text"
          value={inputValues}
          onChange={handleInputchange}
        />
        <select
          id="operation"
          name="operation"
          value={selectedOperation}
          onChange={handleOperationChange}
        >
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
