import styles from "../styles/Home.module.css";
import MintComponent from "../components/MintComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <MintComponent></MintComponent>
      </main>
    </div>
  );
}