import React from 'react';
import { IGraphTypeMethod } from '../types/types';

const GraphTypeMethod = ({
    graphType,
    lineUpLevels,
    showColumnNames,
    showColumnLines,
    setGraphType,
    setLineUpLevels,
    setShowColumnNames,
    setShowColumnLines
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
                {lineUpLevels && (
                    <>
                        <br />
                        <input
                            type="checkbox"
                            name="showcolumns"
                            id="showcolumns"
                            checked={showColumnNames}
                            onChange={e => setShowColumnNames(e.target.checked)}
                        />
                        <label htmlFor="showcolumns">Show Column Names</label>

                        <br />
                        <input
                            type="checkbox"
                            name="showlines"
                            id="showlines"
                            checked={showColumnLines}
                            onChange={e => setShowColumnLines(e.target.checked)}
                        />
                        <label htmlFor="showcolumns">Show Column Lines</label>
                    </>
                )}
            </div>
        </>
    );
};

export default GraphTypeMethod;
