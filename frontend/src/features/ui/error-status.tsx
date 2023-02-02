import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

export const ErrorStatus = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={`w-full h-full p-12 flex items-center justify-center ${
        darkMode ? "bg-stone-800" : "bg-white"
      }`}
    >
      <p className="text-2xl">An error has occurred...</p>
    </div>
  );
};
