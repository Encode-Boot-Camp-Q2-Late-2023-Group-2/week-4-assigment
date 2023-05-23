import styles from "../styles/Home.module.css";
import VoteComponent from "../components/VoteComponent";

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <VoteComponent></VoteComponent>
      </main>
    </div>
  );
}