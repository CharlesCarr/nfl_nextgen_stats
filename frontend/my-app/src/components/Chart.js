import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";

const Chart = () => {
  // const [data, setData] = useState([
  //   { year: "2017", passYards: 52 },
  //   { year: "2018", passYards: 60 },
  //   { year: "2019", passYards: 120 },
  //   { year: "2020", passYards: 97 },
  //   { year: "2021", passYards: 115 },
  // ]);
  const [data] = useState([25, 50, 35, 15, 94, 10])
  const svgRef = useRef();

  useEffect(() => {

    const w = 925;
    const h = 300;
    // set up svg
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      .style("overflow", "visible");

    // set the x and y scaling
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3
      .scaleLinear()
      .domain([0, h])
      .range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      // .ticksFormat(i => i + 1);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black")
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Chart;
