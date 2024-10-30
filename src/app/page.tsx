"use client";

import { useState } from "react";
import { ListElement } from "./components/list-element";
import { useShopingList } from "./shopingListProvider";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { addProduct, productList } = useShopingList();
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
      setErrorMessage("Product name maxium length is 20 characters");
    }
  }

  return (
    <div className="container">
      <div className="add">
        <input
          type="text"
          autoComplete="off"
          id="addInput"
          value={inputValue}
          className="addInput"
          placeholder=""
          onChange={inputChange}
          onKeyDown={enterPressed}
        />
        {errorMessage}
        <label htmlFor="addInput">Product</label>
        <button
          className="addButton"
          id="addButton"
          onClick={addProductClickHandler}
        >
          Add
        </button>
      </div>
      <div className="spacer"></div>
      <div className="list">
        {productList.toReversed().map((product) => (
<<<<<<< HEAD
          <ListElement key={product.id} product={product} />
=======
          <ListElement
            key={product.id}
            fetchProducts={fetchProducts}
            product={product}
          />
>>>>>>> 4f2ec62580b927f7f1db9d91176051aa2e53ea81
        ))}
      </div>
    </div>
  );
}
