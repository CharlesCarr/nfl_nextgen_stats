import * as d3 from "d3";
import { motion } from "framer-motion";

const ChartInner = ({ data, width, height, dataSelection, setDataSelection }) => {
  let margin = {
    top: 20,
    right: 35,
    bottom: 22,
    left: 30,
  };

  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.week))) // how long the data stretches
    .range([margin.left, width - margin.right]); // how long the actual chart stretches

  let yScale = d3
    .scaleLinear()
    .domain(d3.extent(data.map((d) => d.stat)))
    .range([height - margin.bottom, margin.top]);

  let line = d3
    .line()
    .x((d) => xScale(d.week))
    .y((d) => yScale(d.stat));
  let d = line(data);

  const targetDataPoint = (week, stat) => {
    console.log("test mouse enter", week, stat);
    setDataSelection(`Week: ${week} - Stat: ${stat}`);
  };

  return (
    <>
      <svg viewBox={`0 0 ${width} ${height}`}>
        {/* Y Axis */}
        {yScale.ticks(5).map((max) => (
          <g
            transform={`translate(0,${yScale(max)})`}
            className="text-gray-400"
            // fix for same key err - did same for below - fix later
            key={Math.random()}
          >
            <line
              x1={margin.left}
              x2={width - margin.right}
              stroke="currentColor"
            />
            <text
              alignmentBaseline="middle"
              className="text-[10px]"
              fill="currentColor"
            >
              {max}
            </text>
          </g>
        ))}

        {/* X Axis */}
        {xScale.ticks().map((week) => (
          <g
            key={Math.random()}
            className="text-gray-400"
            transform={`translate(${xScale(week)},${height})`}
          >
            <text fill="currentColor" className="text-[10px]" textAnchor="end">
              Wk: {week}
            </text>
          </g>
        ))}

        {/* Line */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
          d={d}
          fill="none"
          stroke="#448167"
          strokeWidth="2"
        />

        {/* Circles */}
        {data.map((d, i) => (
            <motion.circle
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.4, delay: 0.1 * i }}
              key={Math.random()}
              fill="#448167"
              r="5"
              cx={xScale(d.week)}
              cy={yScale(d.stat)}
              stroke="white"
              strokeWidth={2}
              onMouseEnter={() => targetDataPoint(d.week, d.stat)}
            />
        ))}
      </svg>
    </>
  );
};

export default ChartInner;
