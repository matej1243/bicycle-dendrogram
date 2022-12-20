import React from 'react';
import { IModHidden } from '../types/types';

const Hide = ({ hidden, setHidden }: IModHidden): React.ReactElement => {
    const hide = (hiddenName: string) => {
        setHidden({
            active: [...hidden.active, hiddenName],
            inactive: hidden.inactive.filter(hiddenItem => hiddenItem !== hiddenName)
        });
    };

    const show = (hiddenName: string) => {
        setHidden({
            active: hidden.active.filter(hiddenItem => hiddenItem !== hiddenName),
            inactive: [...hidden.inactive, hiddenName]
        });
    };

    return (
        <div className="levels">
            <h2>Hidden:</h2>
            <div className="selected">
                <h4>Active:</h4>
                {hidden?.active.map(hiddenItem => (
                    <span onClick={() => show(hiddenItem)} key={hiddenItem} className="param-btn">
                        {hiddenItem}
                    </span>
                ))}
            </div>
            <div className="unselected">
                <h4>Inactive:</h4>
                {hidden?.inactive.map(hiddenItem => (
                    <span onClick={() => hide(hiddenItem)} key={hiddenItem} className="param-btn">
                        {hiddenItem}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Hide;
