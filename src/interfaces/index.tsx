export interface ThemeAction {
  type: string;
  payload: any;
}

export interface ThemeStore {
  S: number;
  V: number;
  H: number;
  opacity: number;
  rgb_val: number[];
}
