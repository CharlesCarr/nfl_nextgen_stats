import { useQuery } from "@apollo/client";
import ViewDashBtn from "../components/ViewDashBtn";
import AppFullDark from "../images/app/appDark.png";
import AppMobileLight from "../images/app/appMobile1.png";
import { GET_PASSERS } from "../queries/passerQueries";

const LandingPage = () => {
  // Preloading passing data
  useQuery(GET_PASSERS);

  return (
    <div className="relative w-screen h-screen flex-col justify-between bg-gray-50 text-black">
      {/* Horizontal (Landing Page) Nav Bar Component */}
      <div className="w-full h-1/6 flex justify-between items-center border px-5 lg:px-20">
        <p className="ml-10 font-bold text-lg lg:text-2xl">NFL NEXT GEN DASH</p>
        <ViewDashBtn />
      </div>

      <div className="relative h-4/6 w-full flex px-5 lg:px-20 pt-14 overflow-hidden">
        <div className="absolute inset-1/4 -translate-y-2/4 translate-x-2/4 w-1/5 h-3/4 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute inset-2/4 -translate-y-4/4 -translate-x-2/4 w-1/3 h-3/4 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute inset-1/4 -translate-y-1/2 translate-x-full w-1/3 h-1/2 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
        <div className="absolute top-[200px] right-0 w-1/3 h-1/2 bg-slate-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

        <div className="hidden lg:block h-[280px] w-[515px] xl:h-[350px] xl:w-[625px] p-3 rounded-2xl absolute bg-white border top-0 bottom-0 my-auto mx-0 right-20">
          <img
            src={AppFullDark}
            alt="Dashboard Full Dark"
            className="w-full h-full rounded-2xl"
          />
        </div>

        <div className="hidden md:block lg:hidden xl:block md:h-[300px] md:w-[220px] xl:h-[230px] xl:w-[180px] p-2 rounded-2xl  bg-[#0b6241] absolute top-0 xl:top-6 bottom-0 my-auto mx-0 right-32 xl:right-16">
          <img
            src={AppMobileLight}
            alt="Dashboard Mobile Light"
            //   border-2 border-black
            className="w-full h-full rounded-2xl"
          />
        </div>

        <div className="h-full w-full lg:w-1/2 pl-10">
          <p className="w-fit text-xs border rounded-lg font-light px-2 py-1">
            <span className="mr-[5px]">&#127944;</span>TOP NFL DASH WEB APP
          </p>

          <div className="text-3xl lg:text-4xl mt-2 mb-4 font-semibold">
            <h1 className="mb-2">The best way</h1>
            <h1 className="w-fit bg-black text-white px-3 py-1 rounded-lg mb-2 -rotate-6">
              to track
            </h1>
            <h1 className="mb-2">your fantasy team</h1>
          </div>

          <p className="font-light mb-4 text-sm lg:text-base">
            NFL Next Gen Dash allows you to gain insights <br /> by leveraging
            AWS Next Gen Stats data
          </p>

          <ViewDashBtn />
        </div>
      </div>

      <div className="w-full flex items-center h-1/6 pl-16 lg:pl-28 gap-24 font-semibold text-xl lg:text-3xl text-black">
        <div className="flex items-center">
          <p>30+</p>
          <p className="text-xs font-light ml-4">
            Unique player
            <br /> statistics
          </p>
        </div>

        <div className="flex items-center">
          <p>2016</p>
          <p className="text-xs font-light ml-4">
            Active player
            <br /> data since
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
