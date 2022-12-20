import React from 'react';
import { IModLevels } from '../types/types';

const Levels = ({ levels, setLevels }: IModLevels): React.ReactElement => {
    const selectLevel = (levelName: string) => {
        setLevels({
            active: [...levels.active, levelName],
            inactive: levels.inactive.filter(level => level !== levelName)
        });
    };

    const deselectLevel = (levelName: string) => {
        setLevels({
            active: levels.active.filter(level => level !== levelName),
            inactive: [...levels.inactive, levelName]
        });
    };

    return (
        <div className="levels">
            <h2>Levels (order):</h2>
            <div className="selected">
                <h4>Selected:</h4>
                {levels?.active.map(level => (
                    <span onClick={() => deselectLevel(level)} key={level} className="param-btn">
                        {level}
                    </span>
                ))}
            </div>
            <div className="unselected">
                <h4>Unselected:</h4>
                {levels?.inactive.map(level => (
                    <span onClick={() => selectLevel(level)} key={level} className="param-btn">
                        {level}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Levels;
