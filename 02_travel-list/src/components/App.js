import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  function HandleAddItems(item) {
    setItems((items) => [...items, item]);
  }
  function RenewItems(id) {
    setItems((items) => items.filter((i) => i.id !== id));
  }
  function HandlePack(id) {
    setItems((items) =>
      items.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  }

  return (
    <div className="app">
      <Header />
      <AddItem HandleAddItems={HandleAddItems} />
      <Lists items={items} RenewItems={RenewItems} HandlePack={HandlePack} />
      <Stats items={items} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <h1>
        <span>🏝️</span> far away <span>🧳</span>
      </h1>
    </div>
  );
}

function AddItem({ HandleAddItems }) {
  const [selectValue, setSelectValue] = useState(1);
  const [inputValue, setInputValue] = useState("");
  function HandleSubmit(e) {
    const item = {
      name: inputValue,
      num: selectValue,
      packed: false,
      id: Date.now(),
    };
    e.preventDefault();
    // console.log(selectValue, inputValue);
    setSelectValue((selectValue) => 1);
    setInputValue((inputValue) => "");
    HandleAddItems(item);
  }

  return (
    <form className="add-form" onSubmit={(e) => HandleSubmit(e)}>
      <h3>what do you need for your trip?</h3>
      <select
        value={selectValue}
        onChange={(e) => setSelectValue(e.target.value)}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>
      <input
        placeholder="Item..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <button>add</button>
    </form>
  );
}

function Lists({ items, RenewItems, HandlePack }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, i) => (
          <ListItem
            item={item}
            RenewItems={RenewItems}
            HandlePack={HandlePack}
            key={i}
          />
        ))}
      </ul>
      <div className="actions">
          <select>
            <option value="packed">sort by packed status</option>
            <option value="name">sort by name</option>
            <option value="number">sort by number</option>
          </select>
          <button>clear list</button>
      </div>
    </div>
  );
}

function ListItem({ item, RenewItems, HandlePack }) {
  return (
    <li>
      <input type="checkbox" onChange={() => HandlePack(item.id)}></input>
      <span>
        {item.packed ? (
          <del>
            {item.num} {item.name}
          </del>
        ) : (
          `${item.num} ${item.name}`
        )}
      </span>
      <button onClick={() => RenewItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  // const unpackedItems = items.filter((i) => !i.packed);
  const packedItems = items.filter((i) => i.packed);
  return (
    <div className="stats">
      {!items.length ? (
        <p>Adding items for your wonderful trip !</p>
      ) : (
        <p>
          You have {items.length} items on your list, and you already packed{" "}
          {packedItems.length} (
          {((packedItems.length / items.length) * 100).toFixed(2)}%)
        </p>
      )}
    </div>
  );
}
