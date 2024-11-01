import { useContext, createContext, useState, useEffect } from "react";
import { Product } from "./product";

export type ShoppingListContext = {
  productList: Product[];
  addProduct: (name: string) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (id: number, name: string) => Promise<void>;
};

const ShoppingListContext = createContext<null | ShoppingListContext>(null);

export function ShoppingListProvider(props: { children: React.ReactNode }) {
  async function fetchProducts() {
    const [productList, setProductList] = useState<Product[]>([]);
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
    const response = await fetch("api/product", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
    fetchProducts();
  }

  async function editProduct(id: number, name: string) {
    const response = await fetch("/api/product", {
      method: "PUT",
      body: JSON.stringify({ id: id, name: name }),
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ShoppingListContext.Provider
      value={(addProduct, editProduct, deleteProduct, ProductList)}
    >
      {props.children}
    </ShoppingListContext.Provider>
  );
}

// export useShoppingList() {
//     return
// }
