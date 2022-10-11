import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import Dash from "../components/Dash";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full">
      <Head>
        <title>NFL NextGen Stats Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Dash />
    </div>
  );
};

export default Home;
