"use client";

import { useShoppingList } from "./shoppingListProvider";
import { useState } from "react";
import { flushSync } from "react-dom";
import { ListElement } from "./components/list-element";
import { twMerge } from "tailwind-merge";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const { productList, addProduct } = useShoppingList();
  const [isError, setIsError] = useState(false);

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    flushSync(() => {
      setIsError(value.length > 20);
      setInputValue(value);
    });
  }

  function enterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") addProductClickHandler();
  }

  async function addProductClickHandler() {
    if (!isError) {
      const error = await addProduct(inputValue);
      if (error) {
        setIsError(true);
        console.log(error);
      } else {
        setInputValue("");
      }
    } else {
      console.error("The product name is incorrect");
    }
  }

  return (
    <div className="container">
      <div className="add">
        <input
          type="text"
          autoComplete="off"
          value={inputValue}
          id="addInput"
          className={twMerge("addInput", isError && "focus:outline-red-500")}
          placeholder=""
          onChange={inputChange}
          onKeyDown={enterPressed}
        />
        <label htmlFor="addInput">Product</label>
        <button className="addButton" onClick={addProductClickHandler}>
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
