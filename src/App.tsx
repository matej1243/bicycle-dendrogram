import React, { useEffect, useState } from 'react';
import Dentogram from './components/Dentogram';
import './App.css';

import { data as incomingData } from './data/data';
import { InputData } from './types/types';

const App = (): React.ReactElement => {
    const [data, setData] = useState<InputData[]>([]);

    useEffect(() => {
        if (incomingData) setData(incomingData);
    }, [incomingData]);

    return (
        <div>
            <Dentogram inputData={data} />
        </div>
    );
};

export default App;
