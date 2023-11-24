// Graph.js
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const Graph = ({ chartdata, selectedAxis }) => {
  const [series, setSeries] = useState([]);

  const DataGeneratoration = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        x: new Date().getTime() + i * 60000,
        y: [
          Math.random() * 10 + chartdata[selectedAxis],
          Math.random() * 10 + chartdata[selectedAxis],
          Math.random() * 10 + chartdata[selectedAxis],
          Math.random() * 10 + chartdata[selectedAxis],
        ],
      });
    }
    return data;
  };

  const chartOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  useEffect(() => {
    setSeries([
      {
        data: DataGeneratoration(),
      },
    ]);
  }, [chartdata, selectedAxis]);

  return (
    <div id="chart">
      
      <ReactApexChart options={chartOptions} series={series} type="candlestick" height={350} />
    </div>
  );
};

export default Graph;
