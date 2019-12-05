export interface ThemeAction {
  type: string;
  payload: any;
}

export interface Models {
  hex: string;
  hsl: number[];
  rgb: number[];
}

export type Icolors = { name: string; color: string };

export interface Idescr {
  enable: boolean;
  index: number;
  edit: boolean;
}


export type Ifunctions = (str: string, prevColor: string) => void;

// For props Colorpicker
export interface IColorsOptions {
  color?: string;
  syncColors?: Ifunctions[] | [];
  callSave?: Ifunctions[] | [];
  callCancel?: Ifunctions[] | [];
}

// For Redux

export interface IDescription {
  enable: boolean;
  save: boolean;
  edit: boolean;
  remove: boolean;
  index: number;
}

export interface IUser_options_functions {
  main: boolean;
  syncColor: Ifunctions[];
  callSave: Ifunctions[];
  callCancel: Ifunctions[];
}

export interface IUser_options_style {
  picker?: { width: number; height: number };
  circle?: { width: number; height: number };
}
export interface IStrictUser_options_style{
  picker: { width: number; height: number };
  circle: { width: number; height: number };
}

export interface IUser_options {
  style: IStrictUser_options_style;
  functions: IUser_options_functions;
}


export interface ICp_settings {
  S: number;
  V: number;
  H: number;
  opacity: number;
  rgbMain: number[];
  prevColor: string;
  type: string;
}

export interface ThemeStore {
  cp_settings: ICp_settings;
  description: IDescription;
  models: Models;
  user_options: IUser_options;
  colors: Icolors[];
  enable: boolean;
  resize: boolean;
}
