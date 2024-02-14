import React, {useEffect, useState} from 'react';
import { FaRegCopy } from "react-icons/fa";
import './App.css';

function App() {
  const [rangeValue, setRangeValue] = useState(8);
  const [isUpper, setIsUpper] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [finalVal, setFinalVal] = useState(null);
  const onRangeChangeHandler = (e) => {
    e.preventDefault();
    setRangeValue(e.target.value);
  }
  const generatePassword = () => {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbericals = '0123456789';
    const specialCharacters = '/_@!#$%*-';
    let randomString = '';
    let val = '';
    randomString += lowercaseLetters;
    if (isUpper) randomString += upperCaseLetters;
    if (isSpecialChar) randomString += specialCharacters;
    if (isNumber) randomString += numbericals;
    for (let i = 0; i < rangeValue; i++) {
      val += randomString.charAt(Math.floor(Math.random() * randomString.length));
    }
    setFinalVal(val);
  }
  const refresh = () => {
    generatePassword();
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(finalVal);
  }
  useEffect (() => {
    generatePassword();
  }, [rangeValue, isUpper, isNumber, isSpecialChar])
  return (
    <>
      <h2>Password Generator</h2>
      <div className="container">
        <div className="result">
          <div className="final-value">{finalVal}</div>
          <div className="copy-icon" onClick={copyToClipboard}><FaRegCopy /></div>
        </div>
        <div className="slider-container">
          <div className="slider">
            <span className="range-left">8</span>
            <input type="range" min={8} max={20} step={1} value={rangeValue} onChange={onRangeChangeHandler} />
            <span className="range-right">20</span>
          </div>
          <div className="char-count">
            Character count: {rangeValue}
          </div>
        </div>
        <div className="config">
          <label>
            <input type='checkbox' name='uppercase' value={isUpper} onChange={()=> setIsUpper(!isUpper)}/> Uppercase
          </label>
          <label>
            <input type='checkbox' name='lowercase' checked={true} disabled/> Lowercase
          </label>
          <label>
            <input type='checkbox' name='specialchar' value={isSpecialChar} onChange={()=>setIsSpecialChar(!isSpecialChar)}/> {"/_@!#$%*-"}
          </label>
          <label>
            <input type='checkbox' name='number' value={isNumber} onChange={() => setIsNumber(!isNumber)}/> Numbers
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
