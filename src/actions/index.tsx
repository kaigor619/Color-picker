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

// Изменение hex
export const changeHex = () => (dispatch: any, getState: () => ThemeStore) => {
  const { rgb_val, opacity } = getState();
  let hex = convert.RGBAToHexA([...rgb_val, opacity]);

  const action = {
    type: "CHANGE_HEX",
    payload: hex
  };
  dispatch(action);
};

// Изменение opacity
export const change_opacity = (opacity: number) => (
  dispatch: any,
  getState: () => ThemeStore
) => {
  const action = {
    type: "CHANGE_OPACITY",
    payload: opacity
  };
  dispatch(action);

  let { type } = getState();
  if (type == "hex") {
    dispatch(changeHex());
  }
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

// Изменение типа модели цвета и синхронизация этого типа цвета
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
  dispatch(syncModel());
};

// Изменение массива или строки модели цвета
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

// Синхронизацая hsv в rgb
export const syncRGB = () => (dispatch: any, getState: () => ThemeStore) => {
  const { H, S, V, opacity } = getState();
  let val = convert.hsv_rgb(H, S, V);
  dispatch(add_rgb(val));
};

// Синхронизация текущего модели из rgb_val
export const syncModel = () => (dispatch: any, getState: () => ThemeStore) => {
  let { type, rgb_val, H, S, V, opacity } = getState();
  let payload;
  if (type == "rgb") {
    payload = rgb_val;
  } else if (type == "hsl") {
    payload = convert.hsb_hsl(H, S, V);
  } else if (type == "hex") {
    payload = convert.RGBAToHexA([...rgb_val, opacity]);
  }

  dispatch(change_model_val(payload));
};

// Изменение HSV
export const change_hsv = (hsv_array: number[]) => (dispatch: any) => {
  let h = hsv_array[0],
    s = hsv_array[1],
    v = hsv_array[2];
  dispatch(change_h(h));
  dispatch(change_s(s));
  dispatch(change_v(v));

  dispatch(syncRGB());
  dispatch(syncModel());
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

  dispatch(syncModel());
};

// Изменение hsv через модель цвета
export const syncHsvFromModel = () => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  const { type, models } = getStore();

  const model = models[type];
  let payload: number[] = [];

  if (type == "hex") {
    payload = convert.hex_rgba(model);
    console.log(payload);
    dispatch(change_rgb(payload));
  } else if (type == "rgb") {
    payload = model;
    dispatch(change_rgb(payload));
  } else if (type == "hsl") {
    payload = convert.hslTohsb(model);
    dispatch(change_h(payload[0]));
    dispatch(change_s(payload[1]));
    dispatch(change_v(payload[2]));

    dispatch(syncRGB());
  }
};
