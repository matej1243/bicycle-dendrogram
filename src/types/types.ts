export type InputData = {
    Merchant: string;
    Country: string;
    City: string;
    Payment_Medium: string;
    Payment_Method: string;
};

export interface IDedrogram {
    inputData: InputData[];
}

export interface IFilter {
    data: InputData[];
    filters: TFilter[];
    setFilters: React.Dispatch<React.SetStateAction<TFilter[]>>;
}

export type TParams = {
    active: string[];
    inactive: string[];
};

export type DataParams = {
    filters?: TFilter[];
    hidden?: string[];
    levels?: string[];
};

export type GraphType = 'simple' | 'rect' | 'circle';

export interface IDebug {
    rerender: () => void;
    data: InputData[];
    graphData: any;
    levels: TParams;
    hidden: TParams;
    filters: TFilter[];
    tableData: any;
}

export interface IModLevels {
    levels: TParams;
    setLevels: React.Dispatch<React.SetStateAction<TParams>>;
}

export interface IModHidden {
    hidden: TParams;
    setHidden: React.Dispatch<React.SetStateAction<TParams>>;
}
export interface IGraphTypeMethod {
    graphType: GraphType;
    lineUpLevels: boolean;
    showColumnNames: boolean;
    showColumnLines: boolean;
    setGraphType: React.Dispatch<React.SetStateAction<GraphType>>;
    setLineUpLevels: React.Dispatch<React.SetStateAction<boolean>>;
    setShowColumnNames: React.Dispatch<React.SetStateAction<boolean>>;
    setShowColumnLines: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TableFormat = {
    id: string;
    name: string;
    parent: string;
};

export type TOperator = 'eq' | 'neq';

export type TFilter = {
    key: string;
    operator: TOperator;
    value: string;
};

export interface INewLine {
    data: InputData[];
    setData: React.Dispatch<React.SetStateAction<InputData[]>>;
}
