import { useSelector } from "react-redux";
import Form from "../features/auth/Form";
import { RootState } from "../stores/store";

const AuthPage = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  return (
    <div
      className={`w-full flex justify-start items-center relative p-20 ${
        darkMode ? "bg-stone-800" : "bg-white"
      }`}
    >
      <p className="absolute top-6 left-6 font-bold text-xl">
        NFL Next Gen Stats Dashboard
      </p>

      {/* LEFT */}
      <div className="w-1/2 h-full flex justify-center items-start text-center pt-20">
        <div>
          <p className="font-bold">Sign Up</p>
          <p className="underline">Continue as Guest</p>
          <Form />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="w-2/3 h-full bg-gray-700 border rounded-2xl relative">
          <button className="absolute top-6 right-6 bg-gray-500 text-white px-3 py-1 rounded-xl">Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
