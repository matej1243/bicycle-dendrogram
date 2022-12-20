import { stratify } from 'd3';
import { InputData, DataParams, TableFormat } from '../types/types';

const combineKeys = (levels: string[], keys: string[]) => levels.concat(keys.filter(item => levels.indexOf(item) < 0));

const getTable = (input: InputData[], params?: DataParams): TableFormat[] => {
    const output = [{ id: 'root', name: 'root', parent: '' }];

    const filterKeys: string[] = [];
    params?.filters?.forEach(filter => {
        filterKeys.push(filter.key);
    });

    input.forEach((item, inputIndex) => {
        let prevId = ''; // Used for setting parent ID
        let kickedOutIds: string[] = []; // Used for applying filters

        // Rearrange levels or get object keys
        const keys = params?.levels ? combineKeys(params.levels, Object.keys(item)) : Object.keys(item);

        keys.forEach((key, keyIndex) => {
            // Hide levels
            if (params?.hidden?.includes(key)) return;

            // @ts-ignore
            const name: string = item[key];

            // Remove duplicates
            const filteredResults = output.filter(item => item.name === name);

            // Set ID to be unique or take parent ID if it's a duplicate
            let id = filteredResults.length ? filteredResults[0].id : name.toLowerCase() + '_' + inputIndex;

            // Set parent ID
            const parent = keyIndex === 0 ? 'root' : prevId ? prevId : 'root';

            // Apply filters
            if (filterKeys && filterKeys.includes(key)) {
                const filtersMatchingData = params?.filters?.filter(paramFilter => paramFilter.value === name)[0];
                if (!(filtersMatchingData && filtersMatchingData.operator === 'eq')) {
                    kickedOutIds.push(id);
                    prevId = id;
                    return;
                }
            }
            if (kickedOutIds.includes(prevId)) {
                kickedOutIds.push(id);
                prevId = id;
                return;
            }

            // Add to output if it's not a duplicate
            if (!filteredResults.length) output.push({ id, name, parent });

            prevId = id;
        });
    });

    const itemsWithRootAsParent = output.filter(item => item.parent === 'root');
    if (itemsWithRootAsParent.length === 1) {
        output.shift();
        output[0].parent = '';
    }

    return output;
};

export const formatData = (data: InputData[], params?: DataParams) => {
    const table = getTable(data, params);

    const root = stratify()
        .id((d: any) => d.id)
        .parentId((d: any) => d.parent)(table);

    return { root, table };
};
