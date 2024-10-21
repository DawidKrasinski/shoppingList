"use client";

import { useEffect, useState } from "react";
import { ListElement } from "./components/list-element";
import { Product } from "./product";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

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
    <div className="container">
      <div className="add">
        <input
          type="text"
          autoComplete="off"
          value={inputValue}
          className="addInput"
          placeholder=""
          onChange={inputChange}
        />
        <label htmlFor="addInput">Product</label>
        <button className="addButton" id="addButton" onClick={addTask}>
          Add
        </button>
      </div>
      <div className="spacer"></div>
      <div className="list">
        {productList.reverse().map((product) => (
          <ListElement
            key={product.id}
            fetchProducts={fetchProducts}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
