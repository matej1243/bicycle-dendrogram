import React, { useEffect, useState, useRef } from 'react';
import { GraphType, IDedrogram, InputData, RenderMethod, TFilter, TParams } from '../types/types';
import * as d3 from 'd3';
import NewLine from './NewLine';
import Debug from './Debug';
import Levels from './Levels';
import Hide from './Hide';
import GraphTypeMethod from './GraphTypeMethod';
import { formatData } from '../utils/utils';
import Filter from './Filter';

const Dendrogram = ({ inputData }: IDedrogram): React.ReactElement => {
    const dentogramRef = useRef(null);

    const [graphType, setGraphType] = useState<GraphType>('simple');
    const [renderMethod, setRenderMethod] = useState<RenderMethod>('redraw');
    const [data, setData] = useState<InputData[]>([]);
    const [tableData, setTableData] = useState<any>([]);
    const [graphData, setGraphData] = useState<any>([]);
    const [levels, setLevels] = useState<TParams>({ active: [], inactive: [] });
    const [hidden, setHidden] = useState<TParams>({ active: [], inactive: [] });
    const [filters, setFilters] = useState<TFilter[]>([]);

    useEffect(() => {
        if (!inputData) return;

        setData(inputData);
    }, [inputData]);

    useEffect(() => {
        if (!data) return;

        const { root, table } = formatData(data, { levels: levels?.active, hidden: hidden?.active });
        setGraphData(root);
        setTableData(table);

        if (!data[0]) return;
        const keys = Object.keys(data[0]);
        const params: TParams = {
            active: [],
            inactive: []
        };
        keys.forEach(key => params.inactive.push(key));
        setLevels(params);
        setHidden(params);
    }, [data]);

    const drawGraph = () => {
        const width = 1200;
        const height = 800;
        const radius = width / 2;
        const inflection = {
            a: 150,
            b: 150
        };

        d3.selectAll('g').remove();

        const svg = d3
            .select(dentogramRef.current)
            .attr('width', width)
            .attr('height', height)
            .style('border', '2px solid black')
            .style('margin', '10px')
            .append('g')
            .attr('transform', 'translate(100,0)');

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

            svg.selectAll('circle')
                .data(root.descendants())
                .join('circle')
                .attr('transform', (d: any) => `translate(${d.y},${d.x})`)
                .attr('r', 5)
                .style('fill', '#6666ff');

            svg.selectAll('text')
                .data(root.descendants())
                .join('text')
                .attr('transform', (d: any) => `translate(${d.y + (d.children ? -10 : 10)},${d.x + 4})`)
                .style('text-anchor', d => (d.children ? 'end' : 'start'))
                .text(d => d.data.data?.name)
                .transition();
        }
    };

    useEffect(() => {
        drawGraph();
    }, [graphData, tableData, filters, hidden.active, levels.active, graphType]);

    useEffect(() => {
        const { root, table } = formatData(data, { levels: levels?.active, hidden: hidden?.active, filters });
        setGraphData(root);
        setTableData(table);
    }, [filters, hidden.active, levels.active]);

    const rerender = () => {
        if (renderMethod === 'redraw') {
            d3.selectAll('g').remove();
            const { root, table } = formatData(data, { levels: levels?.active, hidden: hidden?.active, filters });
            setGraphData(root);
            setTableData(table);
        }
    };

    return (
        <>
            <svg ref={dentogramRef}></svg>

            <br />
            <hr />
            <br />

            <NewLine data={data} setData={setData} />

            <hr />

            <Filter data={data} filters={filters} setFilters={setFilters} />

            <hr />

            <Debug
                data={data}
                hidden={hidden}
                filters={filters}
                graphData={graphData}
                levels={levels}
                rerender={rerender}
                tableData={tableData}
            />

            <hr />

            <Levels levels={levels} setLevels={setLevels} />

            <hr />

            <Hide hidden={hidden} setHidden={setHidden} />

            <hr />

            <GraphTypeMethod
                graphType={graphType}
                renderMethod={renderMethod}
                setGraphType={setGraphType}
                setRenderMethod={setRenderMethod}
            />
        </>
    );
};

export default Dendrogram;
