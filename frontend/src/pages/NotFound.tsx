import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-20">
      <h1 className="text-4xl font-bold">404: Page Not Found</h1>
      <button
        className="border border-white rounded-xl py-2 px-8 mt-6 hover:bg-white hover:text-[#0b131b] hover:shadow-2xl hover:duration-150"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
