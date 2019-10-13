import { ThemeAction, ThemeStore, IDescription } from '../interfaces';
import Convert from '../options/convert';
import Model from '../options/modelsColor';
import Checking from '../options/checking';

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

export const change_users_colors = (
  colors: { name: string; color: string }[],
) => {
  return { colors };
};

// Изменение PrevColor
export const change_prev_color = prevColor => {
  return { prevColor };
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
export const compo_change_type = (type: string, store) => {
  let a = change_type(type);
  let b = compo_sync_model({ ...store, type });
  return { ...a, ...b };
};

// Изменение opacity и hex
export const compo_change_opacity = (opacity: number, store) => {
  let a = change_opacity(opacity);
  let obj = { ...a };
  const { type, models } = store;
  if (type == 'hex') {
    let b = compo_sync_model(store);
    obj = { ...obj, ...b };
  }

  return obj;
};

// Синхронизация HSV => rgbMain
export const compo_sync_rgbMain = store => {
  const { H, S, V } = store;
  let rgb = Convert.hsv_rgb(H, S, V);
  let obj = change_rgbMain(rgb);
  return obj;
};

// Синхнонизация rgbMain => model
export const compo_sync_model = store => {
  const { rgbMain, type, opacity } = store;
  let modelValue = Model[type]['rgb_' + type](rgbMain, opacity);
  let a = change_model(modelValue, store);

  return a;
};

// Изменение HSV и rgbMain и model
export const compo_change_HSV = (hsv: any, store) => {
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

  let b = compo_sync_model({
    type,
    opacity,
    rgbMain: objStore['rgbMain'],
    models,
  });

  objStore['models'] = b.models;

  return objStore;
};

// Изменение model и затем HSV, rgbMain
export const compo_change_model = (model: string | number[], store) => {
  const { type } = store;
  let rgb = Model[type][type + '_rgb'](model);
  let hsv = Convert.rgb_hsv(rgb);
  let a = change_HSV(hsv, store);
  let b = change_rgbMain(rgb);
  return { ...a, ...b };
};

// export const addColor = (value: string) => (
//   dispatch: any,
//   getStore: () => ThemeStore,
// ) => {
//   const type = Checking.check_color(value);

//   let { val, opacity } = Model[type].getWorkView(value);
//   console.log(val);
//   let rgb = Model[type][type + '_rgb'](val);
//   let hsv = Convert.rgb_hsv(rgb);
//   dispatch(compo_change_type(type));
//   dispatch(compo_change_opacity(opacity));
//   dispatch(change_HSV(hsv));
//   dispatch(change_rgbMain(rgb));
//   dispatch(change_model(val));
//   // dispatch(compo_sync_model());
//   // dispatch(compo_change_model(val));
//   // dispatch(change_prev_color(value));
// };

export const compo_change_model_for_index = (
  value: string | number,
  index: number,
  store,
) => {
  const { type, models } = store;
  let model = models[type];
  let val;

  if (type == 'hex') {
    val = model;
  } else {
    val = model.slice();
    val[index] = +value;
  }
  // console.log(val);

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

  console.log({ ...a, ...b, ...c });
  return { ...a, ...b, ...c };
};

export const eventHSV = hsv => (dispatch, getStore) => {
  const store = getStore();
  let obj = compo_change_HSV(hsv, store);
  dispatch(change_store(obj));
};

export const eventOpacity = opacity => (dispatch, getStore) => {
  const store = getStore();
  let obj = compo_change_opacity(opacity, store);
  dispatch(change_store(obj));
};

export const eventBtnChangeType = type => (dispatch, getStore) => {
  const store = getStore();
  let obj = compo_change_type(type, store);
  dispatch(change_store(obj));
};

export const eventChangeColors = colors => (dispatch, getStore) => {
  const store = getStore();
  let obj = change_users_colors(colors);
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
  let obj = change_description(description);

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

export const eventChangeInputCell = (val, index) => (dispatch, getStore) => {
  let store = getStore();
  let obj = compo_change_model_for_index(val, index, store);

  // dispatch(change_store(obj));
};
