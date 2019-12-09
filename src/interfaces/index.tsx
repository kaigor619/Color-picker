export interface ThemeAction {
  type: string;
  payload: any;
}

export interface Models {
  hex: string;
  hsl: number[];
  rgb: number[];
}

export type Icolors = { name: string; color: string; id: string };

export interface Idescr {
  enable: boolean;
  index: number;
  edit: boolean;
}

export type Ifunctions = (str: string, prevColor: string) => void;

export interface IDescription {
  enable: boolean;
  save: boolean;
  edit: boolean;
  remove: boolean;
  index: number;
}

export interface ISync {
  syncColor: Ifunctions[];
  callSave: Ifunctions[];
  callCancel: Ifunctions[];
}

export interface IColorsOptions {
  color?: string;
  syncColors: Ifunctions[] | [];
  callSave?: Ifunctions[] | [];
  callCancel?: Ifunctions[] | [];
}

export interface IColorsOnInput {
  syncColors?: Ifunctions[] | [];
  callSave?: Ifunctions[] | [];
  callCancel?: Ifunctions[] | [];
}

export interface IOptions {
  picker?: { width: number; height: number };
  circle?: { width: number; height: number };
}
export interface IStrictOptions {
  picker: { width: number; height: number };
  circle: { width: number; height: number };
}

export interface ThemeStore {
  S: number;
  V: number;
  H: number;
  opacity: number;
  rgbMain: number[];
  prevColor: string;
  description: IDescription;
  type: string;
  models: Models;
  colors: Icolors[];
  main: boolean;
  enable: boolean;
  sync: ISync;
  resize: boolean;
  options: IOptions;
}
