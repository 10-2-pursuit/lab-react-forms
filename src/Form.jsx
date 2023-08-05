import React from "react";

function Form({
  selectedOption,
  array,
  error,
  handleArrayChange,
  handleSelectedOptionChange,
  calculateResult,
}) {
  const sumArray = (numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  };

  const averageArray = (numbers) => {
    return sumArray(numbers) / numbers.length;
  };

  function modeArray(numbers) {
    const counts = numbers.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});
    const max = Math.max(...Object.values(counts));
    return Object.keys(counts).find((key) => counts[key] === max);
  }

  const handleValuesChange = (event) => {
    handleArrayChange(event);
  };

  const calculatedResult = () => {
    const numbers = array.split(",").map((Number) => parseInt(Number.trim(), 10));

    if (numbers.some((Number) => isNaN(Number))) {
      // Set error if there are NaN values
      calculateResult(true);
      return;
    }

    // Reset error state if input is valid
    calculateResult(false);

    let resultValue;

    if (selectedOption === "sum") {
      resultValue = sumArray(numbers);
    } else if (selectedOption === "average") {
      resultValue = averageArray(numbers);
    } else if (selectedOption === "mode") {
      resultValue = modeArray(numbers);
    } else {
      resultValue = "Error";
    }

    calculateResult(resultValue);
  };

  return (
    <>
      <form>
        <input
          id="values"
          name="values"
          type="text"
          value={array}
          onChange={handleValuesChange}
          className={error ? "error" : ""}
        />
        <select
          id="operation"
          name="operation"
          value={selectedOption}
          onChange={handleSelectedOptionChange}
          className={error ? "error" : ""}
        >
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="button" onClick={calculatedResult}>
          Calculate
        </button>
      </form>
      <section id="result">
        <p>{error ? "Error: Invalid input" : result !== "" ? `Result: ${result}` : ""}</p>
      </section>
    </>
  );
}

export default Form;
