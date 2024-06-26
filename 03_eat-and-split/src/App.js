import { useState } from "react";

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
//////////////// Main structure ////////////////
export default function App() {
  const [isNewFriend, setIsNewFriend] = useState(false); // open add new friend form
  const [friends, setFriends] = useState([...initialFriends]); // Friends list data
  const [selectedFriend, setSelectedFriend] = useState(null); // the friend is selected or not

  function handleNewFriend() {
    // control add new friend form hidden or display.
    setIsNewFriend(!isNewFriend);
  }
  function handleAddFriend(newFriend) {
    // add new friend in list data
    setFriends([...friends, newFriend]);
    setIsNewFriend(false);
  }
  function handleSelected(friend) {
    // selected friend or not
    setSelectedFriend((prevSelected) =>
      prevSelected === friend ? null : friend
    );
  }
  function handleSplitBill(value) {
    // update the balance with the selected friend
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
              isSelected={selectedFriend === friend}
              key={friend.id}
            />
          ))}
        </ul>
        {isNewFriend && (
          <FormFriends
            isNewFriend={isNewFriend}
            handleAddFriend={handleAddFriend}
          />
        )}
        <button className="button" onClick={handleNewFriend}>
          {isNewFriend ? "Close" : "Add friend"}
        </button>
      </div>

      {selectedFriend && (
        <FormSplit
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

//////////////// friends list ////////////////
function Friend({ data, isSelected, handleSelected }) {
  // const [isSelect, setIsSelect] = useState(false);

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <button className="button" onClick={() => handleSelected(data)}>
        {isSelected ? "Close" : "Select"}
      </button>
    </li>
  );
}

//////////////// Add New Friend ////////////////
function FormFriends({ isNewFriend, handleAddFriend }) {
  const [name, setName] = useState(""); // name input
  const [url, setURL] = useState("https://i.pravatar.cc/48?u="); // image input

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

  return (
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
  );
}

//////////////// show split form ////////////////
function FormSplit({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState(""); // how much money of the bill
  const [myExpense, setMyExpense] = useState(""); // how much I spend
  const [whoPay, setWhoPay] = useState("Me"); // who paid the bill

  function updateBalance(e) {
    // update value after submit
    e.preventDefault();
    onSplitBill(whoPay === "Me" ? billValue - myExpense : -myExpense);
    setBillValue("");
    setMyExpense("");
    setWhoPay("me");
  }

  return (
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
  );
}
