import React from "react";
import "./Form.css";

function Form() {
  const [inputValues, setInputValues] = useState("")

  const handleInputchange = (e) => 
  setInputValues(e.target.value);
  return (
    <>
      <form>
        <input id="values" name="values" type="text" value={inputValues} onChange={handleInputchange}/>
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
