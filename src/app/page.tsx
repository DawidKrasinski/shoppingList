"use client";

import { useEffect, useState } from "react";
import { ListElement } from "./components/list-element";
import { Product } from "./product";

export default function Home() {
  //input support
  const [inputValue, setInputValue] = useState("");
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  //button support
  const [productList, setProductList] = useState<Product[]>([]);
  async function addTask() {
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: inputValue,
      }),
    });
    setInputValue("");
    await fetchProducts();
  }

  async function fetchProducts() {
    const response = await fetch("/api/product");
    const body = await response.json();
    setProductList(body);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

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
        <button id="addButton" onClick={addTask}>
          Add
        </button>
      </div>
      <div id="spacer"></div>
      <div id="list">
        {productList.map((product) => (
          <ListElement key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
