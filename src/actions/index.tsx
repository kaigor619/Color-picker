import { ThemeAction, ThemeStore } from "../interfaces";
import convert from "../options/convert";
import * as Helper from "../options/helper-functions";
import model from "../options/modelsColor";

// Пользовательское добавление цвета
export const add_rgb = (rgb: number[]): ThemeAction => {
  return {
    type: "ADD_RGB",
    payload: rgb
  };
};

// Изменение текущей модели цвета
export const change_type = (type: string) => (
  dispatch: any,
  getState: () => ThemeStore
) => {
  if (model[type]) {
    const action = {
      type: "CHANGE_TYPE",
      payload: type
    };
    dispatch(action);
  }
};

// Изменение массива или строки любой модели цвета
export const change_model_val = (val: string | number[]) => (
  dispatch: any,
  getState: () => ThemeStore
) => {
  const action = {
    type: "CHANGE_MODEL_VAL",
    payload: val
  };
  dispatch(action);
};

// Добавление rgb_val
export const syncRGB = () => (dispatch: any, getState: () => ThemeStore) => {
  const { H, S, V, opacity } = getState();
  let val = convert.hsv_rgb(H, S, V);
  dispatch(add_rgb(val));
};

// Изменение HSV
export const change_hsv = (hsv_array: any) => (dispatch: any) => {
  let h = hsv_array[0],
    s = hsv_array[1],
    v = hsv_array[2];
  dispatch(change_h(h));
  dispatch(change_s(s));
  dispatch(change_v(v));
  dispatch(syncRGB());
};

// Изменение RGB
export const change_rgb = (rgb_array: number[]) => (dispatch: any) => {
  let { h, s, v } = convert.rgbaToHsv(rgb_array);
  dispatch(change_h(h));
  dispatch(change_s(s));
  dispatch(change_v(v));
  dispatch(add_rgb(rgb_array));
};

export const change_color = (value: string) => (dispatch: any) => {
  let type = Helper.check_color(value);
  let { val, opacity } = model[type].getArr(value);

  const action = {
    type: "CHANGE_" + type.toUpperCase(),
    payload: val
  };

  dispatch(action);
  dispatch(change_opacity(opacity));
  dispatch(change_type(type));

  if (type == "rgb") {
    dispatch(change_rgb(val));
  } else if (type == "hsl") {
    let hsb = convert.hslTohsb(val);
    dispatch(change_hsv(hsb));
  } else if (type == "hex") {
    let rgb = convert.hex_rgba(val);
    dispatch(change_rgb(rgb));
  }
};

// Изменение opacity
export const change_opacity = (opacity: number) => (dispatch: any) => {
  const action = {
    type: "CHANGE_OPACITY",
    payload: opacity
  };
  dispatch(action);
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
