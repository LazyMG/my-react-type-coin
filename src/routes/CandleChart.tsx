import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const CandleChart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const exceptData = data ?? [];
  // const chartData = exceptData?.map((i) => {
  //   return {
  //     x: i.time_close,
  //     y: [i.open, i.high, i.low, i.close],
  //   };
  // });
  const chartData = exceptData?.map((i) => {
    return {
      x: i.time_close * 1000,
      y: [i.open, i.high, i.low, i.close],
    };
  });
  // console.log(
  //   chartData?.map((time) => new Date(time.x * 1000).toLocaleString())
  // );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              height: 350,
              toolbar: {
                show: false,
              },
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              type: "datetime",
              categories: chartData?.map((time) =>
                new Date(time.x).toUTCString()
              ),
            },
            yaxis: {
              show: false,
            },
          }}
        />
      )}
    </div>
  );
};

export default CandleChart;
