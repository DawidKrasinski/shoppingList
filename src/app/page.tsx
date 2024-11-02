"use client";

import { useShoppingList } from "./shoppingListProvider";
import { useState } from "react";
import { ListElement } from "./components/list-element";
import { Product } from "./product";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { productList, addProduct } = useShoppingList();
  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function enterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") addProductClickHandler();
  }

  async function addProductClickHandler() {
    if (inputValue !== "" && inputValue.length <= 20) {
      addProduct(inputValue);
      setInputValue("");
    } else {
      console.error("The product name is incorrect");
      // setErrorMessage("Product name maxium length is 20 characters");
    }
  }

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
        <button className="addButton" id="addButton" onClick={addProductClickHandler}>
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
