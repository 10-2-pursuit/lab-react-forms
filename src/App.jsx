import React from "react";
import Form from "./Form";
import "./App.css";

    
function App() {
const [selectedOption, setSelectedOption] = useState("sum");
const [values, setValues] = useState("");
const [array, setArray] = useState("")
const [result, setResult] = useState("")
const [error, setError] = useState(false)

const sumArray = (numbers) => {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}

const averageArray = (numbers) => {
  return sumArray(numbers) / numbers.length;
}

function modeArray (numbers) {
  const counts = numbers.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
  const max = Math.max(...Object.values(counts));
  return Object.keys(counts).find(key => counts[key] === max);
}

function sertError(error) {
  setError(error);
}

const handleValuesChange = (event) => {
  setValues(event.target.value);
  sertError(false);
}

const handleSelectedOptionChange = (event) => {
  setSelectedOption(event.target.value);
}

const calculatedResult = () => {
  const numbers = array.split(",").map((Number) => parseInt(Number.trim(), 10))

  if(numbers.some((Number)=> isNaN(Number))) {
    setError(true)
        return;
  }

  setError(false);

  let calculatedResult;

if (selectedOption.value = "sum" ) {
  calculatedResult.value = sumArray(numbers);
} else if (selectedOption.value = "average") {
  calculatedResult.value = averageArray(numbers);
} else if (selectedOption.value = "mode") {
  calculatedResult.value = modeArray(numbers);
} else {
  calculatedResult.value = Error;
}

setResult(calculatedResult);
setValues("");
}

  return (
    <div className="App">
    
    <main>
      <p>Enter each number in the array, separated by a ','</p>
      <Form />
    </main>
</div>
  )
}

export default App;
