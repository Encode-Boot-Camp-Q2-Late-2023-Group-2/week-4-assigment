import styles from "../styles/InstructionsComponent.module.css";
import * as ballotJson from '../assets/TokenizedBallot.json'
import Router, { useRouter } from "next/router";
import { useRef, useState} from 'react';
import { useSigner } from "wagmi";
import { ethers } from 'ethers';

export default function VoteComponent() {
    const router = useRouter();
    return (
        <div className={styles.container}>
            <header className={styles.header_container}>
                <h1>
                    <span>Vote</span>
                </h1>
            </header>
            <Vote></Vote>
            <div className={styles.footer}>
            </div>
        </div>
    );
}

function Vote() {
    const { data: signer } = useSigner();
    const [txdata, setData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const amount_ref = useRef(0)
    console.log(txdata)
    if (txdata) return (
        <div className={styles.buttons_container}>
            {Button(setData, setLoading, amount_ref, signer)}
            <span>Successfully Voted <a
                href={`https://sepolia.etherscan.io/tx/${txdata}`}
                target={"_blank"}
                style={{ color: "blue" }}>Link</a></span>
        </div>);

    if (isLoading) return (
        <div className={styles.buttons_container}>
            <p>Voting</p>
        </div>);
    return (
        <div className={styles.buttons_container}>
            {Button(setData, setLoading, amount_ref, signer)}
        </div>);
}
async function Request(proposal, amount, setData, setLoading, signer) {
    setLoading(true)
    const contractAddress = "0xA7608BaB1036c9023382A9987309a80c926f4593"
    const contract = new ethers.Contract(contractAddress, ballotJson.abi);
    try {
        const votetx = await contract.connect(signer).vote(proposal, ethers.utils.parseUnits(`${amount}`))
        const votercpt = await votetx.wait();
        setData(votercpt.transactionHash)
    }
    catch
    {
        console.log("Rejected")
    }

    setLoading(false)
}

function Button(setData, setLoading, amount_ref, signer) {
    return (<><input className={[styles.button, styles.text].join(" ")} placeholder="Amount" ref={amount_ref}></input>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(0, amount_ref.current.value, setData, setLoading, signer)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Proposal 1</p>
        </button>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(1, amount_ref.current.value, setData, setLoading, signer)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Proposal 2</p>
        </button>
        <button className={[styles.button, styles.text].join(" ")}
            onClick={() => Request(2, amount_ref.current.value, setData, setLoading, signer)}>
            {/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
            <p>Proposal 3</p>
        </button>
    </>)
}
