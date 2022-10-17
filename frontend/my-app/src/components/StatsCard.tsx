const StatsCard = ({ statName, statNum, statIcon, statChange }: any) => {
  return (
    <div className="border border-black rounded-2xl flex flex-col items-between justify-start px-8 text-xs">
      <div className="flex justify-between items-center h-1/2">
        <p className="text-sm">{statName}</p>
        <p>{statIcon}</p>
      </div>

      <div className="flex justify-center items-center h-1/2">
        <p className="mr-4 text-lg">{statNum}</p>
        <p>{statChange}</p>
      </div>
    </div>
  );
};

export default StatsCard;
