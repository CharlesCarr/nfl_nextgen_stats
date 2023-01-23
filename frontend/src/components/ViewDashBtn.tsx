import { useNavigate } from "react-router-dom";

const ViewDashBtn = () => {
  const navigate = useNavigate();

  const btnHandler = () => {
    navigate("/passing");
  };

  return (
    <button
      className="bg-[#0b6241] rounded-lg px-3 lg:px-6 py-2 lg:py-3 text-sm text-white hover:opacity-80 transition-all"
      onClick={btnHandler}
    >
      View Dashboard
    </button>
  );
};

export default ViewDashBtn;
