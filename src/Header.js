// src/Header.js
import "./Header.css";

import React from "react";
import Web3 from "web3";

function connectMetaMask() {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		window.ethereum.enable();
		console.log(window.web3.version);
	}
}

async function claimAirdrop(e) {
	e.preventDefault();
	connectMetaMask();
	var ABI = [
		{
			type: "constructor",
			stateMutability: "nonpayable",
			inputs: [{ type: "address", name: "contrak", internalType: "contract IERC20" }],
		},
		{
			type: "event",
			name: "Deposit",
			inputs: [
				{ type: "address", name: "user", internalType: "address", indexed: true },
				{ type: "uint256", name: "pid", internalType: "uint256", indexed: false },
				{ type: "uint256", name: "amount", internalType: "uint256", indexed: false },
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "OwnershipTransferred",
			inputs: [
				{ type: "address", name: "previousOwner", internalType: "address", indexed: true },
				{ type: "address", name: "newOwner", internalType: "address", indexed: true },
			],
			anonymous: false,
		},
		{
			type: "event",
			name: "Withdraw",
			inputs: [
				{ type: "address", name: "user", internalType: "address", indexed: true },
				{ type: "uint256", name: "pid", internalType: "uint256", indexed: false },
				{ type: "uint256", name: "amount", internalType: "uint256", indexed: false },
			],
			anonymous: false,
		},
		{
			type: "function",
			stateMutability: "view",
			outputs: [{ type: "uint256", name: "", internalType: "uint256" }],
			name: "balance",
			inputs: [],
		},
		{
			type: "function",
			stateMutability: "view",
			outputs: [{ type: "address", name: "", internalType: "contract IERC20" }],
			name: "contractaddress",
			inputs: [],
		},
		{
			type: "function",
			stateMutability: "nonpayable",
			outputs: [],
			name: "deposit",
			inputs: [{ type: "uint256", name: "_amount", internalType: "uint256" }],
		},
		{ type: "function", stateMutability: "nonpayable", outputs: [], name: "get", inputs: [] },
		{
			type: "function",
			stateMutability: "view",
			outputs: [{ type: "address", name: "", internalType: "address" }],
			name: "owner",
			inputs: [],
		},
		{ type: "function", stateMutability: "nonpayable", outputs: [], name: "renounceOwnership", inputs: [] },
		{
			type: "function",
			stateMutability: "nonpayable",
			outputs: [],
			name: "transferOwnership",
			inputs: [{ type: "address", name: "newOwner", internalType: "address" }],
		},
		{
			type: "function",
			stateMutability: "nonpayable",
			outputs: [],
			name: "update",
			inputs: [{ type: "uint256", name: "_amount", internalType: "uint256" }],
		},
	];
	const fairyContract = new window.web3.eth.Contract(ABI, "0xeAdf7D005596dbad55e067C1208080f83258D452");
	var account = await window.web3.eth.getAccounts();
	account = account[0];
	console.log(account);
	try {
		await fairyContract.methods.get().send({ from: account, gasPrice: 470000000000, gas: 200000 });
	} catch (error) {
		alert(error);
	}
}

function Header() {
	return (
        <header class="header">
          <nav class="navbar navbar-expand-lg py-3">
            <div class="container-fluid">
              <a href="/" class="navbar-brand font-weight-bold">
                <img src="spore_128.png" class="logo" alt="Spore Finance" /> Spore Finance
              </a>
              <button
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                class="navbar-toggler navbar-toggler-right"
              >
                <i class="fa fa-bars"></i>
              </button>
              <div id="navbarSupportedContent" class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                  <li class="nav-item">
                    <a
                      class="nav-link font-weight-bold"
                      href="https://app.pangolin.exchange/#/swap?inputCurrency=0x6e7f5c0b9f4432716bdd0a77a3601291b9d9e985"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buy Spore
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link font-weight-bold"
                      href="https://info.pangolin.exchange/#/token/0x6e7f5c0b9f4432716bdd0a77a3601291b9d9e985"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Analytics
                    </a>
                  </li>
                  <li class="nav-item">
                    <button class="btn btn-outline-light" onClick={claimAirdrop}>
                      Claim Airdrop
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
	);
}

export default Header;
