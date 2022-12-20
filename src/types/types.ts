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
export type RenderMethod = 'update' | 'rerender';
