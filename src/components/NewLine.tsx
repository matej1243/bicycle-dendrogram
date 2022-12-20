import React, { useState } from 'react';
import { INewLine, InputData } from '../types/types';

const NewLine = ({ data, setData }: INewLine): React.ReactElement => {
    const defaultNewItem: InputData = {
        Merchant: '',
        Country: '',
        City: '',
        Payment_Medium: '',
        Payment_Method: ''
    };

    const [newItem, setNewItem] = useState<InputData>(defaultNewItem);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setData([...data, newItem]);

        setNewItem(defaultNewItem);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNewItem({
            ...newItem,
            [e.target.id]: e.target.value
        });

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Data:</h2>
            <input id="Merchant" placeholder="Merchant" value={newItem.Merchant} onChange={handleChange} type="text" />
            <input id="Country" placeholder="Country" value={newItem.Country} onChange={handleChange} type="text" />
            <input id="City" placeholder="City" value={newItem.City} onChange={handleChange} type="text" />
            <input
                id="Payment_Medium"
                placeholder="Payment_Medium"
                value={newItem.Payment_Medium}
                onChange={handleChange}
                type="text"
            />
            <input
                id="Payment_Method"
                placeholder="Payment_Method"
                value={newItem.Payment_Method}
                onChange={handleChange}
                type="text"
            />
            <button>Add</button>
        </form>
    );
};

export default NewLine;
