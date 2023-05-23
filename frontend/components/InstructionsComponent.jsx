import styles from "../styles/InstructionsComponent.module.css";
import * as tokenJson from '../assets/MyERC20Votes.json'
import Router, { useRouter } from "next/router";
import { useSigner } from "wagmi";
import { useState } from 'react';
import { ethers } from 'ethers'

export default function InstructionsComponent() {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<header className={styles.header_container}>
				<h1>
					<span>Voting dapp</span>
				</h1>
			</header>

			<div className={styles.buttons_container}>
				<a
					href={"http://localhost:3000/requestMint"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Request Mint</p>
					</div>
				</a>
				<a
					href={"http://localhost:3000/vote"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Vote</p>
					</div>
				</a>
				<Delegate></Delegate>
				<a
					href={"http://localhost:3000/result"}
				>
					<div className={styles.button}>
						{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
						<p>Results</p>
					</div>
				</a>
			</div>
			<div className={styles.footer}>
			</div>
		</div>
	);
}

function Delegate() {
	const { data: signer } = useSigner();
	const [txdata, setData] = useState(null);
	const [isLoading, setLoading] = useState(false);
	if (txdata) return (<>
		{Button(setData, setLoading, signer)}
		<span>Successfully Delegated <a
			href={`https://sepolia.etherscan.io/tx/${txdata}`}
			target={"_blank"}
			style={{ color: "blue" }}>Link</a></span>
	</>);

	if (isLoading) return (<p className={[styles.text].join(" ")}>Delegating</p>);
	return (<>{Button(setData, setLoading, signer)}</>);

}

async function requestDelegation(setData, setLoading, signer) {
	setLoading(true)
	const contractAddress = "0xf097c9673fCd89d18A2792c99731E03cEF7bc66D"
	const contract = new ethers.Contract(contractAddress, tokenJson.abi);
	try {
		const voter1delegatetx = await contract.connect(signer).delegate(signer._address);
		const voter1delegatercpt = await voter1delegatetx.wait();
		setData(voter1delegatercpt.transactionHash)
	}
	catch
	{
		console.log("Rejected")
	}

	setLoading(false)
}

function Button(setData, setLoading, singer) {
	return (<>
		<button className={[styles.button, styles.text].join(" ")} onClick={() => requestDelegation(setData, setLoading, singer)}>
			{/* <img src="https://static.alchemyapi.io/images/cw3d/Icon%20Medium/lightning-square-contained-m.svg" width={"20px"} height={"20px"} /> */}
			<p>Delegate</p>
		</button>
	</>)
}


