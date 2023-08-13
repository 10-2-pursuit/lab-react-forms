import React from "react";
import { useState } from "react";
import "./Form.css";

function Form() {
  const [numbers, setNumbers] = useState("");
  const [operation, setOperation] = useState("");
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");

  const handleOps = (e) => {
    setOperation(e.target.value);
  };

  const handleInput = (e) => {
    setNumbers(e.target.value);
  };

  const calculate = (e) => {
    e.preventDefault();
    if (!numbers || !operation) {
      setError(true);
      setResult("Invalid input.");
    } else {
      setError(false);
      let nums = numbers.split(",");
      nums = nums.map((n) => {
        return parseInt(n);
      });
      if (operation != "mode") {
        let sum = 0;
        for (let n of nums) {
          sum += n;
        }
        if (operation == "sum") {
          setResult(sum);
        } else {
          setResult(sum / nums.length);
        }
      } else {
        let modePairs = {};
        for (let n of nums) {
          if (modePairs[n]) {
            modePairs[n] += 1;
          } else {
            modePairs[n] = 1;
          }
        }
        let biggestValue = -1;
        let biggestValuesKey = -1;
        Object.keys(modePairs).forEach((key) => {
          let value = modePairs[key];
          if (value > biggestValue) {
            biggestValue = value;
            biggestValuesKey = key;
          }
        });
        setResult(biggestValuesKey);
      }
      setNumbers("");
      setOperation("");
    }
  };
  return (
    <>
      <form>
        <input
          className={error ? "error" : ""}
          id="values"
          name="values"
          type="text"
          onChange={handleInput}
          value={numbers}
        />
        <select
          className={error ? "error" : ""}
          id="operation"
          name="operation"
          onChange={handleOps}
          value={operation}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit" onClick={calculate}>
          Calculate
        </button>
      </form>
      <section id="result">
        <p>{result}</p>
      </section>
    </>
  );
}

export default Form;
