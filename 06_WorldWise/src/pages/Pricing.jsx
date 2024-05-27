// other components and styles
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Pricing() {
  return (
    <div className={styles.product}>
      <PageNav />
      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet
            laborum quos adipisci corrupti, ex porro quam fuga quibusdam, ut
            veniam voluptatum minus minima quasi sed saepe explicabo maiores
            repellendus.
          </p>
        </div>
        <img src="/public/img-2.jpg" alt="pricing" />
      </section>
    </div>
  );
}

export default Pricing;
