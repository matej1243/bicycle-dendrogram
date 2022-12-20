import React from 'react';
import { IDebug } from '../types/types';

const Debug = ({ rerender, data, graphData, levels, filters, hidden, tableData }: IDebug): React.ReactElement => {
    return (
        <div className="btns">
            <h2>Debug:</h2>
            <button onClick={rerender}>Rerender</button>
            <button onClick={() => console.log(data)}>Log Data</button>
            <button onClick={() => console.log(tableData)}>Log Table Data</button>
            <button onClick={() => console.log(graphData)}>Log Graph Data</button>
            <button onClick={() => console.log(levels)}>Log Levels</button>
            <button onClick={() => console.log(hidden)}>Log Hidden</button>
            <button onClick={() => console.log(filters)}>Log Filters</button>
        </div>
    );
};

export default Debug;
