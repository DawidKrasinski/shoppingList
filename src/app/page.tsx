export default function Home() {
  return (
    <div id="container">
    <form autoComplete="off" id="add">
      <input type="text" id="addInput" placeholder="" />
      <label htmlFor="addInput">Product</label>
      <button id="addButton">Add</button>
    </form>
    <div id="spacer" aria-hidden="true"></div>
    <div id="list"></div>
  </div>
  );
}
