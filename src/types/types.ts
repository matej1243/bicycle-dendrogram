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

export type TParams = {
    active: string[];
    inactive: string[];
};

export type DataParams = {
    filters: string[];
    levels: string[];
};

export type GraphType = 'simple' | 'rect' | 'circle';
export type RenderMethod = 'update' | 'rerender' | 'redraw';

export interface IDebug {
    rerender: () => void;
    data: InputData[];
    graphData: any;
    levels: TParams;
    filters: TParams;
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
    renderMethod: RenderMethod;
    setGraphType: React.Dispatch<React.SetStateAction<GraphType>>;
    setRenderMethod: React.Dispatch<React.SetStateAction<RenderMethod>>;
}

export type TableFormat = {
    id: string;
    name: string;
    parent: string;
};
