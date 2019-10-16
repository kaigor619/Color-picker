import { ThemeAction, ThemeStore, IDescription } from '../interfaces';
import Convert from '../options/convert';
import Model from '../options/modelsColor';
import Checking from '../options/checking';

let virtualStore = {};

// Изменение rgbMain
export const change_rgbMain = (rgb: number[]) => {
  return { rgbMain: rgb };
};

// Изменение opacity
export const change_opacity = (opacity: number) => {
  return { opacity };
};

// Изменение type
export const change_type = (type: string) => {
  return { type };
};

// Изменение model
export const change_model = (value: number[] | string, store) => {
  const { type, models } = store;
  return { models: { ...models, [type]: value } };
};

export const change_colors = (colors: { name: string; color: string }[]) => {
  return { colors };
};

// Изменение PrevColor
export const change_prevColor = (prevColor, main) => {
  return main ? { prevColor } : {};
};

// Изменение description
export const change_description = (description: IDescription) => {
  return { description };
};

const change_store = obj => {
  return {
    type: 'CHANGE_STORE',
    payload: obj,
  };
};

// Изменение HSV (change_h, change_s, change_v)
export const change_HSV = (hsv: any, store) => {
  let objStore = {};
  let [H, S, V] = hsv;

  if (H !== null) objStore['H'] = H;
  else H = store['H'];

  if (S !== null) objStore['S'] = S;
  else S = store['S'];

  if (V !== null) objStore['V'] = V;
  else V = store['V'];

  return objStore;
};

// Изменение Типа и изменение полей model
export const cx_type_model = (type: string, store) => {
  let a = change_type(type);
  let b = sync_model_from_rgbMain({ ...store, type });
  return { ...a, ...b };
};

// Изменение opacity и hex
export const cx_opacity_hex = (opacity: number, store) => {
  let a = change_opacity(opacity);
  let b;
  const { type, models } = store;
  if (type == 'hex') {
    b = sync_model_from_rgbMain({ ...store, ...a });
    console.log(b);
  }
  return { ...a, ...b };
};

// Синхронизация HSV => rgbMain
export const sync_rgbMain = store => {
  const { H, S, V } = store;
  let rgb = Convert.hsv_rgb(H, S, V);
  let obj = change_rgbMain(rgb);
  return obj;
};

// Синхнонизация rgbMain => model
export const sync_model_from_rgbMain = store => {
  const { rgbMain, type, opacity } = store;
  let modelValue = Model[type]['rgb_' + type](rgbMain, opacity);
  let a = change_model(modelValue, store);

  return a;
};

// Изменение HSV и rgbMain и model
export const cx_HSV_rgbMain_model = (hsv: any, store) => {
  // let { type, opacity, models } = store;
  let { type, opacity, models } = store;
  let objStore = {};
  let [H, S, V] = hsv;

  if (H !== null) objStore['H'] = H;
  else H = store['H'];

  if (S !== null) objStore['S'] = S;
  else S = store['S'];

  if (V !== null) objStore['V'] = V;
  else V = store['V'];

  objStore['rgbMain'] = Convert.hsv_rgb(H, S, V);

  let b = sync_model_from_rgbMain({
    type,
    opacity,
    rgbMain: objStore['rgbMain'],
    models,
  });

  objStore['models'] = b.models;

  return objStore;
};

export const addColor = (value: string, main: boolean, store) => {
  const type = Checking.check_color(value);
  let { val, opacity } = Model[type].getWorkView(value);
  let rgb = Model[type][type + '_rgb'](val);
  let hsv = Convert.rgb_hsv(rgb);
  let a = cx_HSV_rgbMain_model(hsv, store);
  let b = cx_opacity_hex(opacity, store);
  let c = change_prevColor(value, main);
  return { ...a, ...b, ...c };
};

export const cx_HSV_rgbMain_model_from_model = (
  value: string | number,
  index: number,
  store,
) => {
  const { type, models } = store;
  let model = models[type];
  let val;

  if (type == 'hex') {
    val = value;
  } else {
    val = model.slice();
    val[index] = +value;
  }

  let rgb = Model[type][type + '_rgb'](val);
  let hsv = Convert.rgb_hsv(rgb);
  let a = change_HSV(hsv, store);
  let b = change_rgbMain(rgb);

  let c;
  if (type == 'hex') {
    c = change_model(val, store);
  } else {
    c = change_model([...val], store);
  }

  return { ...a, ...b, ...c };
};

export const eventHSV = hsv => (dispatch, getStore) => {
  const store = getStore();
  let obj = cx_HSV_rgbMain_model(hsv, store);
  dispatch(change_store(obj));
};

export const eventOpacity = opacity => (dispatch, getStore) => {
  const store = getStore();
  let obj = cx_opacity_hex(opacity, store);
  dispatch(change_store(obj));
};

export const eventBtnChangeType = type => (dispatch, getStore) => {
  const store = getStore();
  let obj = cx_type_model(type, store);
  dispatch(change_store(obj));
};

export const eventChangeColors = colors => (dispatch, getStore) => {
  const store = getStore();
  let obj = change_colors(colors);
  dispatch(change_store(obj));
};

export const eventChangeDescription = description => (dispatch, getStore) => {
  const store = getStore();
  let obj = change_description(description);
  dispatch(change_store(obj));
};

export const eventClickSwatch = index => (dispatch, getStore) => {
  let description = {
    edit: false,
    save: false,
    remove: false,
    enable: true,
    index,
  };
  let store = getStore();
  let color = store.colors[index].color;
  let a = addColor(color, false, store);
  let b = change_description(description);

  let obj = { ...a, ...b };

  dispatch(change_store(obj));
};

export const eventClickAddSwatch = () => (dispatch, getStore) => {
  let description = {
    edit: false,
    save: true,
    remove: false,
    enable: true,
    index: 0,
  };
  let obj = change_description(description);
  dispatch(change_store(obj));
};

export const eventChangeInputModel = (val, index) => (dispatch, getStore) => {
  let store = getStore();
  let obj = cx_HSV_rgbMain_model_from_model(val, index, store);

  dispatch(change_store(obj));
};

export const eventChangeInputOpacity = val => (dispatch, getStore) => {
  let store = getStore();
  let obj = cx_opacity_hex(val, store);

  dispatch(change_store(obj));
};

export const eventClickPrevColor = () => (dispatch, getStore) => {
  let store = getStore();
  let obj = addColor(store.prevColor, true, store);

  dispatch(change_store(obj));
};
