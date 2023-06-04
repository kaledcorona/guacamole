'use client';
// Imports
import toast, { Toaster } from "react-hot-toast";
import React, { useState, useEffect} from "react";
import * as solanaWeb3 from "@solana/web3.js";

// Main page
const Main = () => {
    const [pubkey, setpubKey] = useState(null);    // Declare publickey methods
    useEffect(() => {
        let key = window.localStorage.getItem("pubkey");
        // @ts-ignore
        setpubKey(key);
    }, [pubkey]);                 // Update value of pubkey to remove null in first button click


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
    };

    // @ts-ignore
    const WalletSignOut = async () => {
        if (window) {
            window.localStorage.removeItem("pubkey");
            setpubKey(null);
            //Router.reload(window?.location?.pathname);
        };
    };


    return ( 
        <>
            <div className="flex flex-col w-screen h-screen bg-black">
                <div className="flex flex-col py-24  place-items-center justify-center">
                    <h1 className="text-5xl font-bold pb-10 text-emerald-300">
                        Guacamoleeee!
                    </h1>
                </div>
                
                {pubkey ? (
                    <div className="flex flex-col place-items-center justify-center">
                        <br />
                        <h1 className="text-5x1 font-bold pb-5 text-white">
                            Your wallet number is {pubkey}
                        </h1>
                        <br />
                        <div className="flex flex-col place-items-center justify-center">
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
                            className="inline-flex h-8 w-52 justify-center bg-purple-500 font-bold text-white"
                            onClick={() => {WalletSignIn();}}>
                            Make me a toast
                        </button>
                        <Toaster />
                    </div>
                )};
            </div>
        </>
    );
}
export default Main;