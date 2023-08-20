import React, { useState } from "react";
import "./Form.css";

function Forms() {
  const [numbers, setNumbers] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [result, setResult] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleValuesChange = (event) => {
    const inputChar = event.target.value.slice(-1);  
    if (inputChar === "," || !isNaN(inputChar)) {
      setNumbers(event.target.value);
      setHasError(false); 
    } else {
      setHasError(true); 
    }
  };
  
  const handleSelectedOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleCalculateResult = () => {
    const numberArray = numbers.split(",").map(Number);

    if (numberArray.some(isNaN)) {
      setHasError(true);
      setResult("Invalid input.");
    } else {
      setHasError(false);

      let resultValue;

      switch (selectedOption) {
        case "sum":
          resultValue = numberArray.reduce((acc, curr) => acc + curr, 0);
          break;
        case "average":
          resultValue =
            numberArray.reduce((acc, curr) => acc + curr, 0) / numberArray.length;
          break;
        case "mode":
          const counts = {};
          let maxCount = 0;
          let mode = [];

          for (const num of numberArray) {
            counts[num] = (counts[num] || 0) + 1;
            if (counts[num] > maxCount) {
              maxCount = counts[num];
              mode = [num];
            } else if (counts[num] === maxCount) {
              mode.push(num);
            }
          }

          if (mode.length === numberArray.length) {
            resultValue = "No mode.";
          } else {
            resultValue = mode.join(", ");
          }
          break;
        default:
          resultValue = "";
      }

      setResult(`Result: ${resultValue}`);
      setNumbers(""); 
      setSelectedOption(""); 
    }
  };

  return (
    <div className="App">
      <h1>Number Calculator</h1>
      <input
        placeholder="Enter numbers"
        type="text"
        value={numbers}
        onChange={handleValuesChange}
        className={hasError ? "error" : ""}
      />
      <select
        placeholder="Select operation"
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        className={hasError ? "error" : ""}
      >
        <option value=""></option>
        <option value="sum">sum</option>
        <option value="average">average</option>
        <option value="mode">mode</option>
      </select>
      <button onClick={handleCalculateResult}>Calculate</button>
      <section id="result">
        <p>{hasError ? "Error: Invalid input" : result}</p>
      </section>
    </div>
  );
}

export default Forms;
