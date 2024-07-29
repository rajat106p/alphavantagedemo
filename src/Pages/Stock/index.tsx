import React, { useState, useEffect } from 'react';
import { Data } from '../../Interfaces/Stock';
import StockData from '../../Components/StockData';
import DropDown from '../../Components/DropDown';
import { STOCK_SYMBOLS } from '../../Constants';

import { fetchIntradayData } from '../../APIs/stock';

function Stock() {
  const [data, setData] = useState<Data | null>();
  const [selectedStock, setSelectedStock] = useState<string>(STOCK_SYMBOLS[0]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const result = await fetchIntradayData(selectedStock, '5min');
        console.log('result', result)
        setData(result);
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching intraday data:', error);
      }
    };

    getData();
  }, [selectedStock]);


 
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
      <DropDown options={STOCK_SYMBOLS} selectedValue={selectedStock} handleOnChange={setSelectedStock}/>
      {  (isLoading || !data) ? 
          <div>Loading...</div> :
          <StockData data={data}/>

        }
    </div>
    </div>
  );
}

export default Stock;
