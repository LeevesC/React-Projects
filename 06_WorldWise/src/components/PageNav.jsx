import { NavLink } from "react-router-dom";
// other components and styles
import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { useUser } from "../contexts/UserContext";

// page
function PageNav() {
  const { isLogin } = useUser();
  
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          {isLogin ? (
            <img src="https://i.imgur.com/MK3eW3As.jpg" alt="Lee" />
          ) : (
            <NavLink to="/login" className={styles.ctaLink}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
