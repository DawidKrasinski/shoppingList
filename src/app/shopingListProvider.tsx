"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "./product";

export type ShopingListContext = {
  productList: Product[];
  addProduct: (name: string) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (id: number, name: string) => Promise<void>;
};

export const ShopingListContext = createContext<null | ShopingListContext>(
  null
);

export default function ShopingListProvider(props: {
  children: React.ReactNode;
}) {
  const [productList, setProductList] = useState<Product[]>([]);
  async function addProduct(name: string) {
    const response = await fetch("/api/product", {
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    });
    await fetchProducts();
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

  async function fetchProducts() {
    const response = await fetch("/api/product");
    const body = await response.json();
    setProductList(body);
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <ShopingListContext.Provider
      value={{ productList, addProduct, deleteProduct, editProduct }}
    >
      {props.children}
    </ShopingListContext.Provider>
  );
}

export function useShopingList() {
  const context = useContext(ShopingListContext);
  if (!context)
    throw new Error("useShopingList must be used within a ShopingListProvider");
  return context;
}
