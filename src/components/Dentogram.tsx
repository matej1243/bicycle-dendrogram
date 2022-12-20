import React, { useEffect, useState, useRef } from 'react';
import { DataParams, GraphType, IDedrogram, InputData, RenderMethod, TParams } from '../types/types';
import * as d3 from 'd3';

const combineKeys = (levels: string[], keys: string[]) => levels.concat(keys.filter(item => levels.indexOf(item) < 0));

// TODO change "any" to TS types
const getTable = (input: any, params?: DataParams) => {
    const output = [{ id: 'root', name: 'root', parent: '' }];

    input.forEach((item: any, inputIndex: any) => {
        const keys = params?.levels ? combineKeys(params.levels, Object.keys(item)) : Object.keys(item);
        let prevId = '';

        keys.forEach((key, keyIndex) => {
            if (params?.filters?.includes(key)) return;

            const name = item[key];

            const filteredResults = output.filter(item => item.name === name);

            let id = filteredResults.length ? filteredResults[0].id : name.toLowerCase() + '_' + inputIndex;

            const parent = keyIndex === 0 ? 'root' : prevId ? prevId : 'root';

            if (!filteredResults.length) output.push({ id, name, parent });

            prevId = id;
        });
    });

    return output;
};

const formatData = (data: InputData[], params?: DataParams) => {
    const table = getTable(data, params);

    const root = d3
        .stratify()
        .id((d: any) => d.id)
        .parentId((d: any) => d.parent)(table);

    return root;
};

const Dendrogram = ({ inputData }: IDedrogram): React.ReactElement => {
    const dentogramRef = useRef(null);

    const [graphType, setGraphType] = useState<GraphType>('simple');
    const [renderMethod, setRenderMethod] = useState<RenderMethod>('rerender');
    const [data, setData] = useState<InputData[]>([]);
    const [graphData, setGraphData] = useState<any>([]);
    const [levels, setLevels] = useState<TParams>({ active: [], inactive: [] });
    const [filters, setFilters] = useState<TParams>({ active: [], inactive: [] });

    useEffect(() => {
        if (!inputData) return;

        setData(inputData);
    }, [inputData]);

    useEffect(() => {
        if (!data) return;

        setGraphData(formatData(data, { levels: levels?.active, filters: filters?.active }));

        if (!data[0]) return;
        const keys = Object.keys(data[0]);
        const params: TParams = {
            active: [],
            inactive: []
        };
        keys.forEach(key => params.inactive.push(key));
        setLevels(params);
        setFilters(params);
    }, [data]);

    const width = 1400;
    const height = 1400;
    const radius = width / 2;
    const inflection = {
        a: 150,
        b: 150
    };

    const svg = d3
        .select(dentogramRef.current)
        .attr('width', width)
        .attr('height', height)
        .style('border', '2px solid black')
        .style('margin', '10px')
        .append('g')
        .attr('transform', 'translate(100,0)');

    useEffect(() => {
        let cluster;

        if (graphType === 'circle') cluster = d3.cluster().size([360, radius - 60]);
        else cluster = d3.cluster().size([height, width - 200]);

        const root = d3.hierarchy(graphData, d => d.children);
        cluster(root);

        if (graphType === 'circle') {
            svg.selectAll('g').attr('transform', `translate(${radius},${radius})`);

            const linksGenerator = d3
                .linkRadial()
                .angle(function (d) {
                    // @ts-ignore
                    return (d.x / 180) * Math.PI;
                })
                .radius(function (d) {
                    // @ts-ignore
                    return d.y;
                });

            // Add the links between nodes:
            svg.selectAll('path')
                .data(root.links())
                .join('path')
                // @ts-ignore
                .attr('d', linksGenerator)
                .style('fill', 'none')
                .attr('stroke', '#ccc');

            // Add a circle for each node.
            svg.selectAll('g')
                .data(root.descendants())
                .join('g')
                .attr('transform', function (d) {
                    // @ts-ignore
                    return `rotate(${d.x - 90}) translate(${d.y})`;
                })
                .append('circle')
                .attr('r', 7)
                .style('fill', '#69b3a2')
                .attr('stroke', 'black')
                .style('stroke-width', 2);
        } else {
            svg.selectAll('path')
                .data(root.descendants().slice(1))
                .join('path')
                .attr(
                    'd',
                    (d: any) =>
                        `M${d.y},${d.x}C${d.parent.y + inflection.a},${d.x} ${d.parent.y + inflection.b},${
                            d.parent.x
                        } ${d.parent.y},${d.parent.x}`
                )
                .style('fill', 'none')
                .attr('stroke', '#ccc');

            svg.selectAll('g')
                .data(root.descendants())
                .join('g')
                .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
                .append('circle')
                .attr('r', 5)
                .style('fill', '#6666ff');

            svg.selectAll('text')
                .data(root.descendants())
                .enter()
                .append('text')
                .attr('transform', (d: any) => `translate(${d.y + (d.children ? -10 : 10)},${d.x + 4})`)
                .style('text-anchor', d => (d.children ? 'end' : 'start'))
                .text(d => d.data.data.name);
        }
    }, [graphData]);

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

    const selectFilter = (filterName: string) => {
        const filterIndex = filters.inactive.indexOf(filterName);
        const inactiveFilters = filters.inactive;
        inactiveFilters.splice(filterIndex, 1);

        setFilters({
            active: [...filters.active, filterName],
            inactive: inactiveFilters
        });
    };

    const deselectFilter = (filterName: string) => {
        const filterIndex = filters.active.indexOf(filterName);
        const activeFilters = filters.active;
        activeFilters.splice(filterIndex, 1);

        setFilters({
            active: activeFilters,
            inactive: [...filters.inactive, filterName]
        });
    };

    const rerender = () => {
        d3.selectAll('g').remove();
        svg.remove();
        setGraphData(formatData(data, { levels: levels?.active, filters: filters?.active }));
    };

    return (
        <div>
            <svg ref={dentogramRef}></svg>

            <br />
            <hr />
            <br />

            <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
            </div>

            <div className="btns">
                <h2>Debug:</h2>
                <button onClick={rerender}>Rerender</button>
                <button onClick={() => console.log(data)}>Log Data</button>
                <button onClick={() => console.log(graphData)}>Log Graph Data</button>
                <button onClick={() => console.log(levels)}>Log Levels</button>
                <button onClick={() => console.log(filters)}>Log Filters</button>
            </div>

            <hr />

            <div className="levels">
                <h2>Levels:</h2>
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

            <hr />

            <div className="levels">
                <h2>Filters:</h2>
                <div className="selected">
                    <h4>Active:</h4>
                    {filters?.active.map(filter => (
                        <span onClick={() => deselectFilter(filter)} key={filter} className="param-btn">
                            {filter}
                        </span>
                    ))}
                </div>
                <div className="unselected">
                    <h4>Inactive:</h4>
                    {filters?.inactive.map(filter => (
                        <span onClick={() => selectFilter(filter)} key={filter} className="param-btn">
                            {filter}
                        </span>
                    ))}
                </div>
            </div>

            <hr />

            <div className="btns">
                <h2>Graph Type:</h2>
                <small>Current: {graphType}</small>
                <button onClick={() => setGraphType('simple')}>Simple</button>
                <button onClick={() => setGraphType('rect')}>Rectangular</button>
                <button onClick={() => setGraphType('circle')}>Circular</button>
            </div>

            <hr />

            <div className="btns">
                <h2>Render Method:</h2>
                <small>Current: {renderMethod}</small>
                <br />
                <button onClick={() => setRenderMethod('rerender')}>Rerender</button>
                <button onClick={() => setRenderMethod('update')}>Update</button>
            </div>
        </div>
    );
};

export default Dendrogram;
