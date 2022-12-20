import React from 'react';
import { IGraphTypeMethod } from '../types/types';

const GraphTypeMethod = ({
    graphType,
    lineUpLevels,
    setGraphType,
    setLineUpLevels
}: IGraphTypeMethod): React.ReactElement => {
    return (
        <>
            <div className="btns">
                <h2>Graph Type:</h2>
                <small>Current: {graphType}</small>
                <button onClick={() => setGraphType('simple')}>Simple</button>
                <button onClick={() => setGraphType('rect')}>Rectangular</button>
                <button onClick={() => setGraphType('circle')}>Circular</button>
            </div>

            <hr />

            <div className="btns">
                <h2>Misc:</h2>
                <input
                    type="checkbox"
                    name="lineup"
                    id="lineup"
                    checked={lineUpLevels}
                    onChange={e => setLineUpLevels(e.target.checked)}
                />
                <label htmlFor="lineup">Line Up Levels</label>
            </div>
        </>
    );
};

export default GraphTypeMethod;
