import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import DashTop from "../components/DashTop";
import DashBottom from "../components/DashBottom";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full">
      <Head>
        <title>NFL NextGen Stats Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />

      <div className="w-full h-full bg-gray-50 p-12">
        <DashTop />
        <DashBottom />
      </div>

    </div>
  );
};

export default Home;
