// src/api.ts
import axios from 'axios';
import { Data } from '../Interfaces/Stock';
import { API_KEY } from '../Constants';

export const fetchIntradayData = async (symbol: String, time: String): Promise<Data> => {
  const API_URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${time}&apikey=${API_KEY}`;
  const response = await axios.get<Data>(API_URL);
  return response.data;
};
