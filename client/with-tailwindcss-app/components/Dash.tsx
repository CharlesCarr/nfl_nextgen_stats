const Dash = () => {
  const charts = [1, 2, 3];

  return (
    <div className="w-full h-full bg-slate-600 py-8 px-5">
      <div className="h-1/2 w-full flex justify-between items-center border-white border p-4">
        <div className="flex flex-col justify-between items-center border border-black h-full w-3/4 mr-4">
          <div className="flex justify-between items-center border border-white h-1/2 w-full p-4">
            <div className="border border-black w-1/2 h-full">PLAYER SPOTLIGHT</div>
            <div className="border border-black w-1/3 h-full flex flex-col justify-center items-center p-2">
                <div className="border border-white w-full h-1/3 mb-2">SEARCH</div>
                <div className="border border-white w-full h-1/2">TABS</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 border border-white h-2/4 w-full p-4">
            {charts.map((chart: number) => {
                return <div className="border border-black">{chart}</div>
            })}
          </div>
        </div>
        <div className="flex justify-center items-center border border-black h-full w-1/4">
          <p>Image</p>
        </div>
      </div>

      <div className="border border-slate-100 w-full h-1/2 flex justify-between items-center p-4">
        <div className="flex flex-col justify-between items-center border border-black h-full w-3/4 mr-4 p-4">
          <div className="w-full h-1/4 border border-white flex justify-between items-center p-4">
            <div className="w-1/2 h-full border border-black">HEADER</div>
            <div className="w-1/3 h-full border border-black">FILTERS</div>
          </div>
          <div className="w-full h-4/6 border border-white flex justify-center items-center">CHART</div>
        </div>
        <div className="flex flex-col justify-between items-center border border-black h-full w-1/4 p-4">
          <div className="w-full h-1/6 flex items-center justify-center border border-white">HEADER(?)</div>
          <div className="w-full h-4/6 flex flex-col items-center justify-between border border-white p-2">
            {charts.map((chart: number) => {
                return <div className="border border-black w-full h-1/4">{chart}</div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
