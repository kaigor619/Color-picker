export interface ThemeAction {
  type: string;
  payload: any;
}

export interface Models {
  hex: string;
  hsl: number[];
  rgb: number[];
}

export interface ThemeStore {
  S: number;
  V: number;
  H: number;
  opacity: number;
  rgb_val: number[];
  prevColor: { rgb_val: number[]; opacity: number };
  type: string;
  models: Models;
}
