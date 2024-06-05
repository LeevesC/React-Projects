import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import styles from "./User.module.css";

function User() {
  const { isLogin, setIsLogin } = useUser();
  const navigate = useNavigate();
  function handleClick() {
    setIsLogin(false);
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Lee" />
      <span>Welcome, Lee</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
