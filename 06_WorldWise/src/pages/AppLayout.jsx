
// other components and styles
import Sidebar from "../components/app/Sidebar";
import Map from "../components/app/Map";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default AppLayout;
