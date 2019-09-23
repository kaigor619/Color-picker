import { ThemeAction, ThemeStore } from "../interfaces";
import Convert from "../options/convert";
import Model from "../options/modelsColor";
import Checking from "../options/checking";

const ActionsNames = {
  change_rgbMain: "CHANGE_RGB",
  change_h: "CHANGE_H",
  change_s: "CHANGE_S",
  change_v: "CHANGE_V"
};

// Изменение rgbMain
export const change_rgbMain = (rgb: number[]): ThemeAction => {
  return {
    type: "CHANGE_RGB",
    payload: rgb
  };
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

// Изменение opacity
export const change_opacity = (opacity: number): ThemeAction => {
  return {
    type: "CHANGE_OPACITY",
    payload: opacity
  };
};

// Изменение type
export const change_type = (type: string): ThemeAction => {
  return {
    type: "CHANGE_TYPE",
    payload: type
  };
};

// Изменение model
export const change_model = (value: number[] | string) => {
  return {
    type: "CHANGE_MODEL",
    payload: value
  };
};

// Изменение HSV (change_h, change_s, change_v)
export const change_HSV = (hsv: any) => (dispatch: any) => {
  let [h, s, v] = hsv;
  if (h !== null) dispatch(change_h(h));
  if (s !== null) dispatch(change_s(s));
  if (v !== null) dispatch(change_v(v));
};

// Изменение Типа и изменение полей model
export const compo_change_type = (type: string) => (dispatch: any) => {
  dispatch(change_type(type));
  dispatch(compo_sync_model());
};

// Изменение opacity и hex
export const compo_change_opacity = (opacity: number) => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  dispatch(change_opacity(opacity));
  const { type } = getStore();
  if (type == "hex") {
    dispatch(compo_sync_model());
  }
};

// Синхронизация HSV => rgbMain
export const compo_sync_rgbMain = () => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  const { H, S, V } = getStore();
  let rgb = Convert.hsv_rgb(H, S, V);
  dispatch(change_rgbMain(rgb));
};

// Синхнонизация rgbMain => model
export const compo_sync_model = () => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  const { rgbMain, type, opacity } = getStore();
  let modelValue = Model[type]["rgb_" + type](rgbMain, opacity);
  dispatch(change_model(modelValue));
};

// Изменение HSV и rgbMain и model
export const compo_change_HSV = (hsv: any) => (dispatch: any) => {
  dispatch(change_HSV(hsv));
  dispatch(compo_sync_rgbMain());
  dispatch(compo_sync_model());
};

// Изменение model и затем HSV, rgbMain
export const compo_change_model = (model: string | number[]) => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  const { type } = getStore();
  let rgb = Model[type][type + "_rgb"](model);
  let hsv = Convert.rgb_hsv(rgb);
  dispatch(change_HSV(hsv));
  dispatch(change_rgbMain(rgb));
};

export const addColor = (value: string) => (
  dispatch: any,
  getStore: () => ThemeStore
) => {
  const type = Checking.check_color(value);
  let { val, opacity } = Model[type].getWorkView(value);
  let rgb = Model[type][type + "_rgb"](val);
  let hsv = Convert.rgb_hsv(rgb);
  dispatch(compo_change_type(type));
  dispatch(compo_change_opacity(opacity));
  dispatch(change_HSV(hsv));
  dispatch(change_rgbMain(rgb));
  dispatch(compo_sync_model());
  dispatch(compo_change_model(val));
};

export const change_users_colors = (
  colors: { name: string; color: string }[]
) => {
  return {
    type: "CHANGE_USER_COLORS",
    payload: colors
  };
};

export const change_users_colors_index = (index: number) => {
  return {
    type: "CHANGE_USER_COLORS_INDEX",
    payload: index
  };
};

export const change_users_colors_edit = (edit: boolean) => {
  return {
    type: "CHANGE_USER_COLORS_EDIT",
    payload: edit
  };
};

export const change_users_colors_enable = (enable: boolean) => {
  return {
    type: "CHANGE_USER_COLORS_ENABLE",
    payload: enable
  };
};

// Изменение enable и index
export const compo_change_colors_enable = (
  enable: boolean,
  index: number
) => dispatch => {
  dispatch(change_users_colors_enable(enable));
  dispatch(change_users_colors_index(index));
};
