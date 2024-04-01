import { useEffect, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [isForm, setIsForm] = useState(false);
  const [friends, setFriends] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleNewFriend() {
    setIsForm(!isForm);
  }
  function handleAddFriend(newFriend) {
    setFriends([...friends, newFriend]);
    setIsForm(false);
  }
  function handleSelected(friend) {
    setSelectedFriend(friend);
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((item) =>
        item.id === selectedFriend.id ? { ...item, balance: value } : item
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <Friend
              data={friend}
              handleSelected={handleSelected}
              key={friend.id}
            />
          ))}
        </ul>
        <FormFriends isForm={isForm} handleAddFriend={handleAddFriend} />
        <button className="button" onClick={handleNewFriend}>
          {isForm ? "Close" : "Add friend"}
        </button>
      </div>

      <FormSplit
        selectedFriend={selectedFriend}
        onSplitBill={handleSplitBill}
      />
    </div>
  );
}

function Friend({ data, handleSelected }) {
  const [isSelect, setIsSelect] = useState(false);
  function handleSelect() {
    setIsSelect(!isSelect);
  }
  useEffect(() => {
    isSelect ? handleSelected(data) : handleSelected(null);
  }, [isSelect]);

  return (
    <li>
      <img src={data.image} alt={data.name} />
      <h3>{data.name}</h3>
      {data.balance === 0 ? (
        <p>You and Anthony are even</p>
      ) : data.balance > 0 ? (
        <p className="green">
          {data.name} owes you ${Math.abs(data.balance)}
        </p>
      ) : (
        <p className="red">
          You own {data.name} ${Math.abs(data.balance)}
        </p>
      )}
      <button className="button" onClick={handleSelect}>
        {isSelect ? "Close" : "Select"}
      </button>
    </li>
  );
}

function FormFriends({ isForm, handleAddFriend }) {
  const [name, setName] = useState("");
  const [url, setURL] = useState("https://i.pravatar.cc/48?u=");

  function newFriend(e) {
    e.preventDefault();
    if (!name || !url) return;
    const id = Date.now().toString().slice(-6);
    const newFriend = {
      id: id,
      name: name,
      image: url + id,
      balance: 0,
    };
    handleAddFriend(newFriend);
    //reset input values
    setName("");
    setURL("https://i.pravatar.cc/48?u=");
  }

  return isForm ? (
    <form className="form-add-friend">
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🎑 Image URL</label>
      <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
      <button className="button" onClick={(e) => newFriend(e)}>
        Add
      </button>
    </form>
  ) : (
    <div></div>
  );
}

function FormSplit({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState("");
  const [myExpense, setMyExpense] = useState("");
  const [whoPay, setWhoPay] = useState("Me");
  function updateBalance(e) {
    e.preventDefault();

    // friends.map((item) =>
    //   item.id === selectedFriend.id
    //     ? (item.balance = selectedFriend.balance)
    //     : item
    // );
    onSplitBill(whoPay === "Me" ? billValue - myExpense : -myExpense);
  }

  return selectedFriend ? (
    <form className="form-split-bill">
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label>💰 Bill value:</label>
      <input
        type="number"
        value={billValue}
        onChange={(e) => setBillValue(Number(e.target.value))}
      />
      <label>🤙 Your expense:</label>
      <input
        type="number"
        value={myExpense}
        onChange={(e) => setMyExpense(Number(e.target.value))}
      />
      <label>👫 {selectedFriend.name}'s expense:</label>
      <input type="number" value={billValue - myExpense} disabled />
      <label>💳 Who is paying the bill?</label>
      <select value={whoPay} onChange={(e) => setWhoPay(e.target.value)}>
        <option value="me">Me</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <button className="button" onClick={(e) => updateBalance(e)}>
        Split bill
      </button>
    </form>
  ) : (
    <div></div>
  );
}
