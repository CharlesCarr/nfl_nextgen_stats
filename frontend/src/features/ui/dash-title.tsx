const DashTitle = ({ type }: any) => {

  const getPosition = () => {
    let position;

    if (type === "passer") {
      position = "QB";
    } else if (type === "rusher") {
      position = "RB";
    } else {
      position = "WR/TE";
    }
    return position;
  };

  return (
    <p className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-widest mb-2">
      {`${getPosition()} SPOTLIGHT`}
    </p>
  );
};

export default DashTitle;
