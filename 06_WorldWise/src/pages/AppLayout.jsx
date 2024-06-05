// other components and styles
import styles from "./AppLayout.module.css";
import Sidebar from "../components/app/Sidebar";
import Map from "../components/app/Map";
import User from "../components/app/User";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
