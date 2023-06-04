'use client';
// Imports
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect} from "react";
import 'styles/page.css';
import { useRouter } from "next/router";
import {
    Connection,
    SystemProgram,
    Transaction,
    PublicKey,
    LAMPORTS_PER_SOL,
    clusterApiUrl,
    SendTransactionError,
    SOLANA_SCHEMA,
} from "node_modules/@solana/web3.js"

const SOLANA_NETWORK = "devnet";

// Main page
const Main = () => {
    const [pubkey, setpubKey]   = useState(null);    // Declare publickey methods
    const [balance, setBalance] = useState(0);       // Declare balance account
    useEffect(() => {
        let key = window.localStorage.getItem("pubkey");
        // @ts-ignore
        setpubKey(key);
    }, [pubkey]);                    // Update value of pubkey to remove null in first button click

    useEffect(() => {
        let _balance = window.localStorage.getItem("balance_wallet");
        // @ts-ignore
        setBalance(_balance);
    })


    const WalletSignIn = async () => {
        // Detect if phantom is installed
        const getProvider = () => {
            if ('phantom' in window) {             // Check if phantom is installed
                // @ts-ignore
                const provider = window.phantom?.solana;
                if (provider?.isPhantom) {
                    return provider;
                }
            }
            window.open('https://phantom.app/', '_blank');
        };

          
        // If phantom is installed
        const provider = getProvider();
        try {
            const resp   = await provider.connect();      // Retrieve the wallet
            const _key   = resp.publicKey.toString();     // Get wallet pubkey
            setpubKey(_key);                              // Assign public key to global
            window.localStorage.setItem("pubkey", _key);  // Save pubkey into localstorage
        } catch (error) {
            // { code: 4001, message: 'User rejected the request.' }
            console.log("ERROR: 101",error);
        };
        getbalance(pubkey);
    };

    // @ts-ignore
    const WalletSignOut = async () => {
        if (window) {
            window.localStorage.removeItem("pubkey");
            setpubKey(null);
        };
    };

    // @ts-ignore
    const getbalance = async (publicKey) => {
        try {
            const connection = new Connection(clusterApiUrl(SOLANA_NETWORK),"confirmed");
            // @ts-ignore
            const balance    = await connection.getBalance(new PublicKey(pubkey));
            const _balance   = balance / LAMPORTS_PER_SOL;
            // @ts-ignore
            setBalance(_balance);
            window.localStorage.setItem("balance_wallet",balance.toString());
        } catch (error) {
            console.log("Error getting balance:", error);
            toast.error("Something went wrong while getting the balance")
        };
    };
    const gotopage=async()=>{
        window.open('https://youtube.com', '_blank');
    }

    return ( 
        
        <>
        <header style={{backgroundColor:"#3b5998"}}>
            <img src="guacamole_imagotype.png" alt="main-logo" width="500px"/>
            <nav style={{textAlign:"center",position: "absolute", top: 90, right: 250}}>
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            </nav>
        </header>

            <div className="main-container">
                
                <div className="banner-container">
                    <div className="logo-container">
                    </div>
                    <div className="sections-container">
                        <div className="section">

                        </div>
                        <div className="section">

                        </div>
                    </div>
                </div>
            <div className="flex flex-col w-screen h-screen">
                <div className="flex flex-col py-24  place-items-center justify-center">
                    <img src="guacamole_imagotype.png" alt="logo" width="300px"/>
                </div>
                
                {pubkey ? (
                    <div className="flex flex-col place-items-center justify-center">
                        <br />
                        <h1 className="wallet-info">
                            Your wallet number is {pubkey}
                        </h1>
                        <br />
                        <br />
                        <h1 className="wallet-info">
                            Wallet balance: {balance} SOL
                        </h1>
                        <br />
                        <div className="button">
                            <button
                                type="submit"
                                className="inline-flex h-8 w-52 justify-center font-bold bg-purple-500 text-white"
                                onClick={() => {WalletSignOut();}}>
                                    Disconnect Wallet
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col place-items-center justify-center">
                        <button 
                            type="submit" 
                            className="button"
                            onClick={() => {WalletSignIn();}}>
                            Make me a toast
                        </button>
                        <Toaster />
                    </div>
                )};
            </div>
            </div>
        </>
    );
}
export default Main;