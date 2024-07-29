import React, {useState} from 'react';
import { Data } from '../../Interfaces/Stock';
import { TimeSeriesEntry } from '../../Types/Stock';
import Pagination from '../Pagination';

interface Props {
    data: Data;
}

const StockData: React.FC<Props> = ({ data }) => {
  const { "Meta Data": metaData, "Time Series (5min)": timeSeries, Information } = data;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{ key: keyof TimeSeriesEntry | 'time'; direction: 'asc' | 'desc' } | null>(null);

  const itemsPerPage = 10;
  if (Information) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Information</h1>
        <p>{Information}</p>
      </div>
    );
  }

  const timeSeriesKeys = Object.keys(timeSeries);
  const totalPages = Math.ceil(timeSeriesKeys.length / itemsPerPage);


  const requestSort = (key: keyof TimeSeriesEntry | 'time') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    let sortableData = [...timeSeriesKeys];
    if (sortConfig !== null) {
        sortableData.sort((a, b) => {
            if (sortConfig.key === 'time') {
                const aTime = new Date(a).getTime();
                const bTime = new Date(b).getTime();
                if (aTime < bTime) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aTime > bTime) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
            } else {
                const aValue = parseFloat(timeSeries[a][sortConfig.key]);
                const bValue = parseFloat(timeSeries[b][sortConfig.key]);
                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
            }
            return 0;
        });
    }
    return sortableData;
  }, [timeSeriesKeys, sortConfig, timeSeries]);

  const currentData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{metaData["2. Symbol"]} Stock Data</h1>
      <p>{metaData["1. Information"]}</p>
      <p>Last Refreshed: {metaData["3. Last Refreshed"]}</p>
      <p>Interval: {metaData["4. Interval"]}</p>
      <p>Time Zone: {metaData["6. Time Zone"]}</p>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="text-left">
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('time')}>
                Time {sortConfig?.key === 'time' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>            
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('1. open')}>
                Open {sortConfig?.key === '1. open' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('2. high')}>
                High {sortConfig?.key === '2. high' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('3. low')}>
                Low {sortConfig?.key === '3. low' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('4. close')}>
                Close {sortConfig?.key === '4. close' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th className="px-4 py-2 border-b cursor-pointer" onClick={() => requestSort('5. volume')}>
                Volume {sortConfig?.key === '5. volume' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
            </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((time) => {
                const entry = timeSeries[time];
                return (
                    <tr key={time} className="hover:bg-gray-100">
                        <td className="px-4 py-2 border-b">{time}</td>
                        <td className="px-4 py-2 border-b">{entry['1. open']}</td>
                        <td className="px-4 py-2 border-b">{entry['2. high']}</td>
                        <td className="px-4 py-2 border-b">{entry['3. low']}</td>
                        <td className="px-4 py-2 border-b">{entry['4. close']}</td>
                        <td className="px-4 py-2 border-b">{entry['5. volume']}</td>
                    </tr>
                )
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default StockData;
