import React, { useEffect, useState } from 'react';
import { IFilter, InputData, TOperator } from '../types/types';

type TValue = { [key: string]: string[] };

const getValues = (data: InputData[]) => {
    let values: TValue = {};
    let keys: string[] = [];
    if (data.length) keys = Object.keys(data[0]);

    data.forEach(item => {
        const keys = Object.keys(item);
        keys.forEach(key => {
            if (!values[key]) values[key] = [];
            // @ts-ignore
            if (!values[key].includes(item[key])) values[key].push(item[key]);
        });
    });

    return { values, keys };
};

const Filter = ({ data, filters, setFilters }: IFilter): React.ReactElement => {
    const [values, setValues] = useState<TValue>();
    const [keys, setKeys] = useState<string[]>();
    const [selectedKey, setSelectedKey] = useState('');
    const [selectedOperator, setSelectedOperator] = useState<TOperator>('eq');
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const { values, keys } = getValues(data);
        setValues(values);
        setKeys(keys);
    }, [data]);

    const handleSubmit = () => {
        setFilters([...filters, { key: selectedKey, operator: selectedOperator, value: selectedValue }]);
    };

    const deleteFilter = (filterIndex: number) => {
        setFilters(filters.filter((filter, index) => index !== filterIndex));
    };

    return (
        <div className="levels">
            <h2>Filter:</h2>

            {filters.map((filter, index) => (
                <div key={filter.key + filter.value} className="filter-list-item">
                    <span>{filter.key} </span>
                    <span>{filter.operator === 'eq' ? '==' : '!='} </span>
                    <span>{filter.value} </span>
                    <span className="delete" onClick={() => deleteFilter(index)}>
                        DELETE
                    </span>
                </div>
            ))}

            <div className="dropdowns">
                <select
                    name="keyselect"
                    id="keyselect"
                    value={selectedKey}
                    onChange={e => setSelectedKey(e.target.value)}
                    placeholder="Key"
                >
                    <option disabled value="">
                        Key
                    </option>
                    {keys?.map(key => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>

                <select
                    name="operatorselect"
                    id="operatorselect"
                    value={selectedOperator}
                    onChange={(e: any) => setSelectedOperator(e.target.value)}
                >
                    <option disabled value="">
                        Operator
                    </option>
                    <option value="eq">Equals</option>
                    <option value="neq">Not-Equals</option>
                </select>

                <select
                    name="valueselect"
                    id="valueselect"
                    value={selectedValue}
                    onChange={e => setSelectedValue(e.target.value)}
                >
                    <option disabled value="">
                        Value
                    </option>
                    {values &&
                        values[selectedKey] &&
                        values[selectedKey].map(value => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                </select>

                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Filter;
