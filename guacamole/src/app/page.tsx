'use client';
import toast, { Toaster } from "react-hot-toast";


const notify = () => toast('Here is your toast.');


const Main = () => {
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
                        onClick={notify}>
                        Make me a toast
                    </button>
                    <Toaster />
                </div>
            </div>
        </>
    );
}
export default Main;