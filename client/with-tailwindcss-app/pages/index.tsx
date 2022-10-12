import type { NextPage } from "next";
import Head from "next/head";
import NavBar from "../components/NavBar";
import DashTop from "../components/DashTop";
import DashBottom from "../components/DashBottom";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full font-montserrat">
      <Head>
        <title>NFL NextGen Stats Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <NavBar />

      <div className="w-full h-full bg-white p-12">
        <DashTop />
        <DashBottom />
      </div>
    </div>
  );
};

export default Home;
