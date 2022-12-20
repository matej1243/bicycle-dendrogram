import React, { useState } from 'react';

const NewLine = (): React.ReactElement => {
    const defaultNewItem = {
        merchant: '',
        country: '',
        city: '',
        medium: '',
        method: ''
    };

    const [newItem, setNewItem] = useState(defaultNewItem);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newItem);
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
            <input id="merchant" placeholder="Merchant" value={newItem.merchant} onChange={handleChange} type="text" />
            <input id="country" placeholder="Country" value={newItem.country} onChange={handleChange} type="text" />
            <input id="city" placeholder="City" value={newItem.city} onChange={handleChange} type="text" />
            <input
                id="medium"
                placeholder="Payment_Medium"
                value={newItem.medium}
                onChange={handleChange}
                type="text"
            />
            <input
                id="method"
                placeholder="Payment_Method"
                value={newItem.method}
                onChange={handleChange}
                type="text"
            />
            <button>Add</button>
        </form>
    );
};

export default NewLine;
