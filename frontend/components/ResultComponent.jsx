import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from 'react';

export default function ResultComponent() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Result</span>
                </h1>
            </header>
            <div className={styles.buttons_container}>
                <div className={[styles.button, styles.text].join(" ")}>
                    {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
                    <p>Proposal 1 = {Result(0)}</p>
                </div>
                <div className={[styles.button, styles.text].join(" ")}>
                    {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
                    <p>Proposal 2 = {Result(1)}</p>
                </div>
                <div className={[styles.button, styles.text].join(" ")}>
                    {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
                    <p>Proposal 3 = {Result(2)}</p>
                </div>
                <Winner></Winner>
            </div>
            <div className={styles.footer}>
            </div>
        </div>
    );
}

function Result(index) {
    const [data, setData] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const url = `http://localhost:2000/result/${index}`
    useEffect(() => {
        setLoading(true);
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false);
          });
      }, []);

    if (isLoading) return <span>...</span>;
    if (!data) return <p>No profile data</p>;
    return (
        <span>{data.vote}</span>
    );
}

function Winner()
{
    const [data, setData] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const url = `http://localhost:2000/winner`
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            });
    }, []);

    if (isLoading) return <span>...</span>;
    if (!data) return <p>No profile data</p>;
    return (
        <span className={[styles.button, styles.text].join(" ")}>Winner={data.winner}</span>
    );
}



