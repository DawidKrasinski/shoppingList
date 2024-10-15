import { Product } from "../product";

export function ListElement({ product }: { product: Product }) {
  function deleteItemFromList() {}

  return (
    <div className="listElement">
      <div>{product.name}</div>
      <button
        onClick={deleteItemFromList()}
        className="bg-red-400 w-10 h-10 rounded-md flex justify-center"
      >
        d
      </button>
    </div>
  );
}
