"use client";

import { useState } from "react";
import Product from "./components/Product";

export default function Home() {
  //input support
  const [inputValue, setInputValue] = useState("");
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  //button support
  const [productList, setProductList] = useState<string[]>([]);
  function buttonClicked() {
    const newProductList = [...productList, inputValue];
    setProductList(newProductList);
    console.log(newProductList);
  }

  return (
    <div id="container">
      <div id="add">
        <input
          type="text"
          autoComplete="off"
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
      <div id="spacer"></div>
      <div id="list">
        {productList.map((element, index) => (
          <Product key={index} productName={element} />
        ))}
      </div>
    </div>
  );
}
