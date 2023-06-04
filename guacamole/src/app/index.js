//import MainLayout from "@/components/layouts/MainLayout";
import { useState } from "react";
import { useContext } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <MainLayout>
      <div className="w-full flex justify-center items-center min-h-screen">
        <div className="container max-w-7xl w-full flex flex-col justify-center items-center">
          <iframe
            src="https://giphy.com/embed/rgUAbFsBqSLxouZcPL"
            width="480"
            height="480"
            class="giphy-embed"
            allowFullScreen
          ></iframe>
          <h1 className="text-4xl font-bold my-4">Solanamos Starter 🙌 !</h1>
        </div>
      </div>
    </MainLayout>
  );
}