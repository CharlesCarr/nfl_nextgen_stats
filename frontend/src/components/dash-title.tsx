

const DashTitle = ({type}: any) => {
  return (
    <p className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-widest mb-2">
      {type === "passer" ? "QB" : "RB"} SPOTLIGHT
    </p>
  );
};

export default DashTitle;
