import NavBar from "./nav-bar";

export interface DashLayoutProps {
  darkMode: boolean;
  children: React.ReactNode;
}

const DashLayout = ({ darkMode, children }: DashLayoutProps) => {
  return (
    <>
      <NavBar />
      <div
        className={`w-full h-full p-10 ${
          darkMode ? "bg-stone-800" : "bg-white"
        }`}
      >
        {children}
      </div>
    </>
  );
};

export default DashLayout;
