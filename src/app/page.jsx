"use client";

// import Product from 'components/Product.tsx'
import { useState } from "react";

export default function Home() {
  //input support
  const [inputValue, setInputValue] = useState("");
  function inputChange(e) {
    setInputValue(e.target.value);
  }

  //button support
  const [productList, setProductList] = useState([]);
  function buttonClicked() {
    const newProductList = [...productList, inputValue];
    setProductList(newProductList);
    console.log(newProductList);
  }

  return (
    <div id="container">
      <div autoComplete="off" id="add">
        <input
          type="text"
          value={inputValue}
          id="addInput"
          placeholder=""
          onChange={inputChange}
        />
        <label htmlFor="addInput">Product</label>
        <button id="addButton" onClick={buttonClicked}>
          Add
        </button>
      </div>
      <div id="spacer" aria-hidden="true"></div>
      <div id="list"></div>
    </div>
  );
}
