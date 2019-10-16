export interface ThemeAction {
  type: string;
  payload: any;
}

export interface Models {
  hex: string;
  hsl: number[];
  rgb: number[];
}

export type Icolors = { name: string; color: string }[];

export interface Idescr {
  enable: boolean;
  index: number;
  edit: boolean;
}

type Ifunctions = (str: string) => void;
export interface Isync {
  main: boolean;
  functions: Ifunctions[];
}

export interface IuserColors {
  description: Idescr;
  colors: Icolors;
}

export interface IDescription {
  enable: boolean;
  save: boolean;
  edit: boolean;
  remove: boolean;
  index: number;
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
  colors: Icolors;
  sync: Isync;
}
