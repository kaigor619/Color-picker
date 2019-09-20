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

export interface IuserColors {
  description: Idescr;
  colors: Icolors;
}

export interface ThemeStore {
  S: number;
  V: number;
  H: number;
  opacity: number;
  rgbMain: number[];
  prevColor: { rgbMain: number[]; opacity: number };
  type: string;
  models: Models;
  userColors: IuserColors;
}
