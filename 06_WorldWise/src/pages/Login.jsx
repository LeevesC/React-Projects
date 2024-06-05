import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

const EMAIL = "lee@gmail.com";
const PASSWORD = "123456";

function Login() {
  const [email, setEmail] = useState("lee@gmail.com");
  const [password, setPassword] = useState("123456");
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (email === EMAIL && password === PASSWORD) {
      setIsLogin(true);
      navigate("/app/cities");
    } else {
      alert("Email or Password incorrect");
    }
  }

  return (
    <main className={styles.login}>
      <form className={styles.form} onSubmit={(e) => handleLogin(e)}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.ctaLink}>Login</button>
        </div>
      </form>
    </main>
  );
}

export default Login;
