"use client";

// import Product from 'components/Product.tsx'
import { useState } from "react";

export default function Home() {
  //input support
  const [inputValue, setInputValue] = useState("");
  function inputChange(e) {
    setInputValue(e.target.value);
    console.log(e.target.value);
  }

  //add button support

  return (
    <div id="container">
      <form autoComplete="off" id="add">
        <input
          type="text"
          value={inputValue}
          id="addInput"
          placeholder=""
          onChange={inputChange}
        />
        <label htmlFor="addInput">Product</label>
        <button id="addButton">Add</button>
      </form>
      <div id="spacer" aria-hidden="true"></div>
      <div id="list"></div>
    </div>
  );
}
