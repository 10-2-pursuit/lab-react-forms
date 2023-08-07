import React, { useState } from "react";
import "./Form.css";

function Form() {
  const [inputValue, setInputValue] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("sum");
  const [result, setResult] = useState("");

  
  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <form>
        <input
          onChange={handleInputChange}
          value={inputValue}
          id="values"
          name="values"
          type="text"
        />
        <select value={ selectedOperation } onChange={ setSelectedOperation } id="operation" name="operation">
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
