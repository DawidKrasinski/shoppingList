import { useContext, createContext } from "react";
import { Product } from "./product";

export type ShoppingListContext = {
  productList: Product[];
  addProduct: (name: string) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  editProduct: (id: number, name: string) => Promise<void>;
};

const ShoppingListContext = createContext<null | ShoppingListContext>(null);

export function ShoppingListProvider();
