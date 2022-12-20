import React from 'react';
import { IModLevels } from '../types/types';

const Levels = ({ levels, setLevels }: IModLevels): React.ReactElement => {
    const selectLevel = (levelName: string) => {
        const levelIndex = levels.inactive.indexOf(levelName);
        const inactiveLevels = levels.inactive;
        inactiveLevels.splice(levelIndex, 1);

        setLevels({
            active: [...levels.active, levelName],
            inactive: inactiveLevels
        });
    };

    const deselectLevel = (levelName: string) => {
        const levelIndex = levels.active.indexOf(levelName);
        const activeLevels = levels.active;
        activeLevels.splice(levelIndex, 1);

        setLevels({
            active: activeLevels,
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
