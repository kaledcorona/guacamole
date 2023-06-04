'use client';
// Imports
import toast, { Toaster } from "react-hot-toast";
import { Connection, PublicKey } from '@solana/web3.js';

// Global declaration
const notify = () => toast('Here is your toast.');

// Main page
const Main = () => {
    const WalletSignIn = async () => {
        // Detect if phantom is installed
        const getProvider = () => {
            if ('phantom' in window) {    // Check if phantom is installed
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
            const resp = await provider.connect();
            console.log(resp.publicKey.toString());
        } catch (err) {
            // { code: 4001, message: 'User rejected the request.' }
        }


    };


    return ( 
        <>
            <div className="flex flex-col w-screen h-screen bg-black">
                <div className="flex flex-col py-24  place-items-center justify-center">
                    <h1 className="text-5xl font-bold pb-10 text-emerald-300">
                        Guacamoleeee!
                    </h1>
                </div>
                <div className="flex flex-col place-items-center justify-center">
                    <button 
                        type="submit" 
                        className="inline-flex h-8 w-52 justify-center bg-purple-500 font-bold text-white"
                        onClick={() => {WalletSignIn();}}>
                        Make me a toast
                    </button>
                    <Toaster />
                </div>
            </div>
        </>
    );
}
export default Main;