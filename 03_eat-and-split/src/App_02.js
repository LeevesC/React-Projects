import { fireEvent } from "@testing-library/react";
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
//////////////// common button ////////////////
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

//////////////// Main structure ////////////////
export default function AppNew() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
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
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

//////////////// friends ul ////////////////
function FriendsList({ friends, selectedFriend, onSelection }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
}

//////////////// friend <li> ////////////////
function Friend({ friend, selectedFriend, onSelection }) {
  const isSelected = selectedFriend?.id === friend?.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 ? (
        <p>You and Anthony are even</p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      ) : (
        <p className="red">
          You own {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

//////////////// add friend form ////////////////
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState(""); // name input
  const [url, setURL] = useState("https://i.pravatar.cc/48?u="); // image input
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !url) return;
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${url}${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setURL("https://i.pravatar.cc/48?u=");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>🎑 Image URL</label>
      <input type="text" value={url} onChange={(e) => setURL(e.target.value)} />
      <Button>Add</Button>
    </form>
  );
}

//////////////// split bill form ////////////////
function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [billValue, setBillValue] = useState(""); // how much money of the bill
  const [myExpense, setMyExpense] = useState(""); // how much I spend
  const [whoPay, setWhoPay] = useState("Me"); // who paid the bill

  function updateBalance(e) {
    // update value after submit
    e.preventDefault();
    if (!billValue || !myExpense) return;
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
