import React from "react";
import Form from "./Form";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("sum");
  const [result, setResult] = useState("");
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleOperationChange = (event) => {
    setSelectedOperation(event.target.value);
  };
  const handleCalculate = () => {
    const numbers = inputValue
      .split(",")
      .map((num) => parseInt(num.trim(), 10));
    const invalidInput = numbers.some(isNaN) || inputValue.trim() === "";
    const calculatedResult =
      !invalidInput &&
      (selectedOperation === "sum"
        ? numbers.reduce((acc, curr) => acc + curr, 0)
        : selectedOperation === "average"
        ? numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length
        : selectedOperation === "mode"
        ? (function () {
            const numCounts = numbers.reduce((countMap, num) => {
              countMap[num] = (countMap[num] || 0) + 1;
              return countMap;
            }, {});
            const maxCount = Math.max(...Object.values(numCounts));
            return Object.keys(numCounts).find(
              (key) => numCounts[key] === maxCount
            );
          })()
        : null);
    setResult(invalidInput ? "Invalid input." : calculatedResult);
  };
  return (
    <div>
      <label>
        Enter comma-separated numbers:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Choose an operation:
        <select value={selectedOperation} onChange={handleOperationChange}>
          <option value="sum">Sum</option>
          <option value="average">Average</option>
          <option value="mode">Mode</option>
        </select>
      </label>
      <br />
      <button onClick={handleCalculate}>Calculate</button>
      <div>Result: {result}</div>
    </div>
  );
}

export default App;
