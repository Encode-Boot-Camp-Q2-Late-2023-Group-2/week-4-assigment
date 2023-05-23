import styles from "../styles/InstructionsComponent.module.css";
import Router, { useRouter } from "next/router";
import { useRef } from 'react';
import { useSigner } from "wagmi";
import { useState } from 'react';

export default function MintComponent() {
    const router = useRouter();

    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Mint</span>
                </h1>
            </header>
            <Mint></Mint>
            <div className={styles.footer}>
            </div>
        </div>
    );
}

function Mint() {
    const { data: signer } = useSigner()
    const [txdata, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const amount_ref = useRef(0)
    if (txdata) return (
        <div className={styles.buttons_container}>
        {Button(signer, setData, setLoading, amount_ref)}
            <span>Successfully Minted <a
                href={`https://sepolia.etherscan.io/tx/${txdata.Transaction_hash}`}
                target={"_blank"}
                style={{ color: "blue" }}>Link</a></span>
        </div>);
    if (isLoading) return (<><p>Requesting for a mint</p></>);
    return (<div className={styles.buttons_container}>
        {Button(signer, setData, setLoading, amount_ref)}
        </div>);

}

function Request(amount, address, setData, setLoading) {
    setLoading(true)
    const url = `http://localhost:2000/mint?amount=${amount}&address=${address}`
    fetch(url, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            setData(data);
            setLoading(false);
        });
}

function Button(signer, setData, setLoading, amount_ref) {
    return (<>
        <input className={[styles.button, styles.text].join(" ")} placeholder="Amount" ref={amount_ref}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(amount_ref.current.value, signer._address, setData, setLoading)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Request</p>
        </button>
    </>);
}

