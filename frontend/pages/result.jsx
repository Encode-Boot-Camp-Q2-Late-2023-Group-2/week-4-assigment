import styles from "../styles/Home.module.css";
import ResultComponent from "../components/ResultComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <ResultComponent></ResultComponent>
      </main>
    </div>
  );
}