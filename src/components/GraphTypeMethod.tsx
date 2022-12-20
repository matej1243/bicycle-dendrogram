import React from 'react';
import { IGraphTypeMethod } from '../types/types';

const GraphTypeMethod = ({
    graphType,
    renderMethod,
    setGraphType,
    setRenderMethod
}: IGraphTypeMethod): React.ReactElement => {
    return (
        <>
            <div className="btns">
                <h2>Graph Type:</h2>
                <small>Current: {graphType}</small>
                <button onClick={() => setGraphType('simple')}>Simple</button>
                {/* <button onClick={() => setGraphType('rect')}>Rectangular</button> */}
                <button onClick={() => setGraphType('circle')}>Circular</button>
            </div>

            {/* <hr /> */}

            {/* <div className="btns">
                <h2>Render Method:</h2>
                <small>Current: {renderMethod}</small>
                <br />
                <button onClick={() => setRenderMethod('rerender')}>Rerender</button>
                <button onClick={() => setRenderMethod('update')}>Update</button>
            </div> */}
        </>
    );
};

export default GraphTypeMethod;
