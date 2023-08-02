import React from "react";
import "./Form.css";
import { useState } from "react"

function Form() {
  const numberRegex = /^-?[0-9]*$/;
  const [intResult, setResult] = useState();
  const [strOperation, setOperation] = useState("");
  let boolNaN = false;
  let numbers = [];

  function sumNumbers(){
    (!boolNaN) ? setResult(numbers.reduce((total,elem)=>total+elem,0)) : setResult("Invalid input.");
  }

  function averageNumbers(){
    (!boolNaN) ? setResult(numbers.reduce((total,elem)=>total+elem,0)/numbers.length) : setResult("Invalid input.");
  }

  function modeNumbers(){
    let tempResult = numbers[0];
    if(numbers.length == 1){
      setResult(numbers[0]);
    }
    else{
      for(let index = 1; index<numbers.length; index++){
        tempResult = tempResult % numbers[index];
      }
      (!boolNaN) ? setResult(tempResult) : setResult("Invalid input.");
    }
  }

  function inputHandler(str){
    str = str.split(",");
    for(let element of str){
      if(!element.match(numberRegex)){
        boolNaN = true;
        continue;
      }
      numbers.push(Number(element));
    }
  }

  function operationHandler(operation){
    setOperation(operation);
  }

  function resetToDefault(){
    const form = document.getElementById('form');
    const selectionBox = document.getElementById('operation');

    selectionBox.selectedIndex = 0;
    boolNaN = false;
    form.reset();
  }

  function submitHandler(e){
    e.preventDefault();

    let strValues = document.getElementById('values');
    inputHandler(strValues.value);

    switch(strOperation){
      case "sum":
        sumNumbers();
        break;
      case "average":
        averageNumbers();
        break;
      case "mode":
        modeNumbers();
        break;
      default:
        setResult("err");
        break;
    }
    resetToDefault(e);
    
  }

  return (
    <>
      <form id="form" onSubmit={(e)=>submitHandler(e)}>
        <input id="values" name="values" type="text" />
        <select id="operation" name="operation" value={ strOperation } onChange={(e)=>operationHandler(e.target.value)}>
          <option value=""></option>
          <option value="sum">sum</option>
          <option value="average">average</option>
          <option value="mode">mode</option>
        </select>
        <button type="submit">Calculate</button>
      </form>
      <section id="result">
        <p>{intResult}</p>
      </section>
    </>
  );
}

export default Form;
