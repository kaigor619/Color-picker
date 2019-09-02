import { ThemeAction } from "../interfaces";
import convert from "../options/convert";

// Добавление rgb_val
export const add_rgb = (rgb: number[]): ThemeAction => {
  return {
    type: "ADD_COLOR",
    payload: rgb
  };
};

// Изменение HSV
export const change_hsv = (hsv_array: any) => (dispatch: any) => {
  let h = hsv_array[0],
    s = hsv_array[1],
    v = hsv_array[2];
  dispatch(change_h(h));
  dispatch(change_s(s));
  dispatch(change_v(v));
  dispatch(add_rgb(convert.hsv_rgb(h, s, v)));
};

// Изменение H
export const change_h = (h: number): ThemeAction => {
  return {
    type: "CHANGE_H",
    payload: h
  };
};

// Изменение S
export const change_s = (s: number): ThemeAction => {
  return {
    type: "CHANGE_S",
    payload: s
  };
};

// Изменение V
export const change_v = (v: number): ThemeAction => {
  return {
    type: "CHANGE_V",
    payload: v
  };
};
