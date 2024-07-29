import React from 'react';
import { DropDownProps } from '../../Interfaces/Stock';

const DropDown: React.FC<DropDownProps> = ({options, selectedValue, handleOnChange}) => {
    return (
        <div className="mb-4">
            <select
                id="stock-select"
                value={selectedValue}
                onChange={(e) => handleOnChange(e.target.value)}
                className="mt-1 block border border-gray-300 p-2 rounded-md w-48 ext-base  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
            {options.map((symbol) => (
                <option key={symbol} value={symbol}>
                {symbol}
                </option>
            ))}
            </select>
        </div>
    )
}

export default DropDown;