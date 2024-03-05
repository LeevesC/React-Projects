const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  const start = 10;
  const close = 22;
  const currHour = new Date().getHours();

  return (
    <div className="container">
      <Header />
      <Menu menuNum={pizzaData.length} />
      {currHour <= close && currHour >= start && <PizzaList />}
      <Footer start={start} close={close} currHour={currHour} />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Fast REACT Pizza CO.</h1>
    </div>
  );
}

function Menu({ menuNum }) {
  return (
    <div className="menu">
      <h2>our menu</h2>
      <p>
        Authentic Italian cuisine. {menuNum} creative dished to choose from. All
        from our stone oven, all organic, all delicious.
      </p>
    </div>
  );
}

function PizzaList() {
  return (
    <div className="pizzas">
      {pizzaData.map((pizza) => (
        <Pizza pizza={pizza} key={pizza.name} />
      ))}
    </div>
  );
}

function Pizza({ pizza }) {
  return (
    <div className={pizza.soldOut ? "pizza sold-out" : "pizza"}>
      <img src={pizza.photoName} alt={pizza.name} />
      <div>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.soldOut ? "Sold Out" : pizza.price}</span>
      </div>
    </div>
  );
}

function Footer({ start, close, currHour }) {
  console.log(currHour);
  return (
    <div className="footer">
      <div className="order">
        <p>
          We're open from {start} to {close}. Come visit us or oder online
        </p>
        {currHour <= close && currHour >= start ? (
          <a className="btn">Order</a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
