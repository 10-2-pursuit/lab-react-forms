import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValues, setInputValues] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
    setIsError(false);
  };

  const handleSelectChange = (e) => {
    setSelectedOperation(e.target.value);
    setIsError(false);
    setResult("");
  };

  const calculateResult = (values, operation) => {
    const numbers = values.split(",").map((num) => parseInt(num.trim()));

    if (numbers.some(isNaN)) {
      setIsError(true);
      setResult("Invalid input.");
      return;
    }

    let calculatedResult;

    if (operation === "sum") {
      calculatedResult = numbers.reduce((acc, num) => acc + num, 0);
    } else if (operation === "average") {
      calculatedResult = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
    } else if (operation === "mode") {
      const occurrences = {};
      numbers.forEach((num) => {
        occurrences[num] = occurrences[num] ? occurrences[num] + 1 : 1;
      });
      let maxOccurrences = 0;
      let mode = null;
      for (const num in occurrences) {
        if (occurrences[num] > maxOccurrences) {
          maxOccurrences = occurrences[num];
          mode = num;
        }
      }
      calculatedResult = mode;
    }

    setResult(calculatedResult);
    setInputValues(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateResult(inputValues, selectedOperation);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          id="values"
          name="values"
          type="text"
          value={inputValues}
          onChange={handleInputChange}
          className={isError ? "error" : ""}
        />
        <select
          id="operation"
          name="operation"
          value={selectedOperation}
          onChange={handleSelectChange}
          className={isError ? "error" : ""}
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