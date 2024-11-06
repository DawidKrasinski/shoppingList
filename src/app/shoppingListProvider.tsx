"use client";
import { useContext, createContext, useState, useEffect } from "react";
import { Product } from "./product";

export type ShoppingListContext = {
  productList: Product[];
  addProduct: (name: string) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (id: number, name: string) => Promise<void>;
};

const ShoppingListContext = createContext<null | ShoppingListContext>(null);

export default function ShoppingListProvider(props: {
  children: React.ReactNode;
}) {
  const [productList, setProductList] = useState<Product[]>([]);
  async function fetchProducts() {
    const response = await fetch("/api/product");
    const body = await response.json();
    setProductList(body);
  }

  async function addProduct(name: string) {
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    });
    fetchProducts();
  }

  async function deleteProduct(id: number) {
    const response = await fetch(`api/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  async function editProduct(id: number, name: string) {
    const response = await fetch(`/api/product/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name }),
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShoppingListContext.Provider
      value={{
        addProduct,
        editProduct,
        deleteProduct,
        productList,
      }}
    >
      {props.children}
    </ShoppingListContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingListContext);
  if (!context)
    throw new Error("useShopingList must be used within a ShopingListProvider");
  return context;
}
