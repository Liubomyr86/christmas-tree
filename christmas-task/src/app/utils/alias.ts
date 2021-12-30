export interface IFilterData {
  shape: string[];
  color: string[];
  size: string[];
}

export interface IToyCardData {
  num: string;
  nameRu: string;
  name: string;
  amount: string;
  year: string;
  shapeRu: string;
  shape: string;
  colorRu: string;
  color: string;
  sizeRu: string;
  size: string;
  favorite: boolean;
}

export interface IFilterKeys {
  shape?: string;
  color?: string;
  size?: string;
  selected: boolean;
}

export interface IGarlandData {
  line: number;
}
