import { stratify } from 'd3';
import { InputData, DataParams, TableFormat } from '../types/types';

const combineKeys = (levels: string[], keys: string[]) => levels.concat(keys.filter(item => levels.indexOf(item) < 0));

const getTable = (input: InputData[], params?: DataParams): TableFormat[] => {
    const output = [{ id: 'root', name: 'root', parent: '' }];

    input.forEach((item, inputIndex) => {
        const keys = params?.levels ? combineKeys(params.levels, Object.keys(item)) : Object.keys(item);
        let prevId = '';

        keys.forEach((key, keyIndex) => {
            if (params?.filters?.includes(key)) return;

            // @ts-ignore
            const name: string = item[key];

            const filteredResults = output.filter(item => item.name === name);

            let id = filteredResults.length ? filteredResults[0].id : name.toLowerCase() + '_' + inputIndex;

            const parent = keyIndex === 0 ? 'root' : prevId ? prevId : 'root';

            if (!filteredResults.length) output.push({ id, name, parent });

            prevId = id;
        });
    });

    return output;
};

export const formatData = (data: InputData[], params?: DataParams): d3.HierarchyNode<any> => {
    const table = getTable(data, params);

    const root = stratify()
        .id((d: any) => d.id)
        .parentId((d: any) => d.parent)(table);

    return root;
};
