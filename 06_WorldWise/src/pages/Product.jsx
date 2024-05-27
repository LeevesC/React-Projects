// other components and styles
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

function Product() {
  return (
    <div className={styles.product}>
      <PageNav />
      <section>
        <img src="/public/img-2.jpg" alt="pricing" />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil amet
            laborum quos adipisci corrupti, ex porro quam fuga quibusdam, ut
            veniam voluptatum minus minima quasi sed saepe explicabo maiores
            repellendus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            vitae ad magni illum autem nulla incidunt, accusantium qui
            recusandae? Laboriosam nemo, natus repellendus soluta quia quo. Quos
            dolorum explicabo fuga.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Product;
