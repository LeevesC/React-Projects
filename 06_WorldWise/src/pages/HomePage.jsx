// other components and styles
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

function HomePage() {
  return (
    <>
      <div className={styles.homepage}>
        <PageNav />
        <section>
          <h1>
            You travel the world.
            <br />
            WorldWise keeps track of your adventures.
          </h1>
          <h2>
            A world map that tracks your footsteps into every city you can think
            of. Never forget your wonderful experiences, and show your friends
            how you have wandered the world.
          </h2>
        </section>
      </div>
    </>
  );
}

export default HomePage;
