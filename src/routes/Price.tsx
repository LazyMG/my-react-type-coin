import React from "react";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 25px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

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

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

const Price = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>price</span>
              <span>{data?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>ath_price</span>
              <span>{data?.quotes.USD.ath_price.toFixed(3)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>market_cap_change_24h</span>
              <span>{data?.quotes.USD.market_cap_change_24h}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>change_24h</span>
              <span>{data?.quotes.USD.percent_change_24h}%</span>
            </OverviewItem>
            <OverviewItem>
              <span>change_7d</span>
              <span>{data?.quotes.USD.percent_change_7d}%</span>
            </OverviewItem>
            <OverviewItem>
              <span>change_30d</span>
              <span>{data?.quotes.USD.percent_change_30d}%</span>
            </OverviewItem>
            <OverviewItem>
              <span>change_1y</span>
              <span>{data?.quotes.USD.percent_change_1y}%</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </div>
  );
};

export default Price;
