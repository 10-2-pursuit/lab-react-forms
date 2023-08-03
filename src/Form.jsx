import { useState } from "react";
import React from "react";
import "./Form.css";


function Form() {
  const [input, setInput] = useState("");
  const [option, setOption] = useState("");
  const [output, setOutput] = useState("");

  return (
    <>
      <form>
        <input id="values" name="values" type="text" />
        <select id="operation" name="operation">
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
