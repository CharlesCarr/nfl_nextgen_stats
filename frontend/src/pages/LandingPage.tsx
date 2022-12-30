import { useNavigate } from "react-router-dom";
import AppFullDark from "../images/app/appDark.png";
import AppMobileLight from "../images/app/appMobile1.png";
// import { AiTwotoneTrophy } from "react-icons/ai";

const LandingPage = () => {
    const navigate = useNavigate();

    const btnHandler = () => {
        navigate('/passing');
    };

  return (
    <div className="relative w-screen h-screen flex-col justify-between bg-white text-black">
      {/* Horizontal (Landing Page) Nav Bar Component */}
      <div className="w-full h-1/6 flex justify-between items-center border px-20">
        <p className="ml-10 font-bold text-2xl">NFL NEXT GEN DASH</p>
        <button className="bg-[#0b6241] rounded-lg px-6 py-3 text-sm text-white" onClick={btnHandler}>
          View Dashboard
        </button>
      </div>

      <div className="relative h-4/6 w-full flex px-20 pt-14 overflow-hidden">
        <div className="absolute inset-1/4 -translate-y-2/4 translate-x-2/4 w-1/5 h-3/4 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute inset-2/4 -translate-y-4/4 -translate-x-2/4 w-1/3 h-3/4 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute inset-1/4 -translate-y-1/2 translate-x-full w-1/3 h-1/2 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-[200px] right-0 w-1/3 h-1/2 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        {/* <AiTwotoneTrophy className="w-40 h-40 absolute inset-2/4 -translate-y-full -translate-x-2/4 text-white text-3xl" /> */}

        <div className="h-full w-1/2 pl-10">
          <p className="w-fit text-xs border rounded-lg font-light px-2 py-1">
            #1 NFL DASH IN APP STORE
          </p>

          <div className="text-4xl mt-2 mb-4">
            <h1 className="mb-2">The best way</h1>
            <h1 className="w-fit bg-black text-white px-3 py-1 rounded-lg mb-2 -rotate-6">
              to track
            </h1>
            <h1 className="mb-2">your fantasy team</h1>
          </div>

          <p className="font-light mb-4">
            NFL Next Gen Dash allows you to gain insights <br />{" "}
            by leveraging AWS Next Gen Stats data
          </p>

          <button className="bg-[#0b6241] rounded-lg px-6 py-3 text-sm text-white" onClick={btnHandler}>
            View Dashboard
          </button>
        </div>
      </div>

      <div className="h-[350px] w-[625px] p-3 rounded-2xl absolute bg-white border top-[145px] right-20">
        <img
          src={AppFullDark}
          alt="Dashboard Full Dark"
          className="w-full h-full rounded-2xl"
        />
      </div>

{/* bg-stone-800 */}
      <div className="h-[230px] w-[180px] p-2 rounded-2xl  bg-[#0b6241] absolute top-[355px] right-40">
        <img
          src={AppMobileLight}
          alt="Dashboard Mobile Light"
        //   border-2 border-black
          className="w-full h-full rounded-2xl"
        />
      </div>

      <div className="w-full flex items-center h-1/6 pl-28 gap-24 font-semibold text-3xl text-black">
        <div className="flex items-center">
          <p>4.9</p>
          <p className="text-xs font-light ml-4">
            Users rating
            <br /> on App Store
          </p>
        </div>

        <div className="flex items-center">
          <p>1.8M</p>
          <p className="text-xs font-light ml-4">
            Downloads all
            <br /> over the world
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
