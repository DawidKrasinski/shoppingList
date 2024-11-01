"use client";

import { useEffect, useState } from "react";
import { ListElement } from "./components/list-element";
import { Product } from "./product";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function enterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") addTask();
  }

  const [productList, setProductList] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <div className="add">
        <input
          type="text"
          autoComplete="off"
          value={inputValue}
          className="addInput"
          placeholder=""
          onChange={inputChange}
          onKeyDown={enterPressed}
        />
        <label htmlFor="addInput">Product</label>
        <button className="addButton" id="addButton" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="spacer"></div>
      <div className="list">
        {productList.toReversed().map((product) => (
          <ListElement key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
