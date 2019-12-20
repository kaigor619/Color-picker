import { IDescription, Ifunctions, IOptions, Icolors } from '../interfaces';
import Convert from '../options/convert';
import Model from '../options/modelsColor';
import Checking from '../options/checking';
import { default_description } from '../reducers';

export function connect_obj(...mas) {
  let obj = {};
  mas.forEach(element => {
    obj = { ...obj, ...element };
  });
  return obj;
}

// Изменение rgbMain
export const change_rgbMain = (rgbMain: number[]) => {
  return { rgbMain };
};

// Изменение enable picker
export const change_enable = (enable: boolean) => {
  return { enable };
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
  const { type, models, main, sync, opacity } = store;
  let { syncColors } = sync;
  if (main) {
    let color = Model[type].getString(value, opacity);
    syncColors.forEach(element => {
      element(color);
    });
  }

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

// Изменение main
export const change_main = (main: boolean) => {
  return { main };
};

// Изменение syncColors
export const change_syncColors = (syncColors: Ifunctions[]) => {
  return { syncColors };
};

// Изменение callSave
export const change_callSave = (callSave: Ifunctions[]) => {
  return { callSave };
};

// Изменение callCancel
export const change_callCancel = (callCancel: Ifunctions[]) => {
  return { callCancel };
};

// Изменение Store
const change_store = obj => {
  return {
    type: 'CHANGE_STORE',
    payload: obj,
  };
};

// Изменение HSV (change_h, change_s, change_v)
export const cx_HSV = (hsv: any, store) => {
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
  return connect_obj(a, b);
};

// Изменение opacity и hex
export const cx_opacity_hex = (opacity: number, store) => {
  let a = change_opacity(opacity);

  const { models, main, sync, type } = store;
  let b;
  let { syncColors } = sync;
  if (type === 'hex') {
    b = sync_model_from_rgbMain({ ...store, ...a });
  }

  if (main) {
    let color = Model[type].getString(
      b ? b.models[type] : models[type],
      a.opacity,
    );
    syncColors.forEach(element => {
      element(color);
    });
  }
  return connect_obj(a, b);
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
    ...store,
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
  let a = cx_HSV(hsv, store);
  let b = change_rgbMain(rgb);
  let e = change_opacity(opacity);
  let c = change_type(type);
  let d = change_model(val, { ...store, type });
  let k = change_prevColor(value, main);
  let x = change_description(default_description);
  return connect_obj(a, b, c, d, e, k, x);
};

export const cx_HSV_rgbMain_model_from_model = (
  value: string | number,
  index: number,
  store,
) => {
  const { type, models } = store;
  let model = models[type];
  let val;

  if (type === 'hex') {
    val = value;
  } else {
    val = model.slice();
    val[index] = +value;
  }

  let rgb = Model[type][type + '_rgb'](val);
  let hsv = Convert.rgb_hsv(rgb);
  let a = cx_HSV(hsv, store);
  let b = change_rgbMain(rgb);

  let c;
  if (type === 'hex') {
    c = change_model(val, store);
  } else {
    c = change_model([...val], store);
  }

  return connect_obj(a, b, c);
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

export const eventChangeDescription = description => (dispatch, getStore) => {
  let obj = change_description(description);
  let action = {
    type: 'CHANGE_DESCRIPTION',
    payload: obj.description,
  };
  dispatch(action);
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

  let obj = connect_obj(a, b);

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
  let action = {
    type: 'CHANGE_DESCRIPTION',
    payload: description,
  };
  dispatch(action);
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

export const eventAddColor = options => (dispatch, getStore) => {
  let store = getStore();
  const { enable } = store;
  let { color, syncColors, callSave, callCancel } = options;

  let a = addColor(color, true, store);

  let b = change_main(false);
  let c = change_syncColors([]);
  let d = change_callSave([]);
  let e = change_callCancel([]);

  if (Checking.check_arrFunctions(syncColors)) {
    b = change_main(true);
    c = change_syncColors(syncColors);
  }
  if (Checking.check_arrFunctions(callSave)) {
    d = change_callSave(callSave);
  }
  if (Checking.check_arrFunctions(callCancel)) {
    e = change_callCancel(callCancel);
  }

  let k;
  if (!enable) k = change_enable(true);

  let sync = connect_obj(c, d, e);
  let obj = connect_obj(a, b, k, { sync });

  dispatch(change_store(obj));
};

export const eventClickOk = () => (dispatch, getStore) => {
  let {
    sync: { callSave },
    models,
    type,
    opacity,
    main,
  } = getStore();
  let color = Model[type].getString(models[type], opacity);

  let a = change_enable(false);
  let b = change_main(false);
  let c = change_syncColors([]);
  let d = change_callSave([]);
  let e = change_callCancel([]);

  let sync = connect_obj(c, d, e);

  let obj = connect_obj(a, b, { sync });

  dispatch(change_store(obj));

  if (main) {
    Promise.resolve().then(() => {
      callSave.forEach(func => {
        func(color);
      });
    });
  }
};

export const eventClickCancel = () => (dispatch, getStore) => {
  let {
    sync: { callCancel },
    models,
    type,
    opacity,
    prevColor,
    main,
  } = getStore();
  let color = Model[type].getString(models[type], opacity);

  let a = change_enable(false);
  let b = change_main(false);
  let c = change_syncColors([]);
  let d = change_callSave([]);
  let e = change_callCancel([]);

  let sync = connect_obj(c, d, e);

  let obj = connect_obj(a, b, { sync });

  dispatch(change_store(obj));
  // Исправить
  if (main) {
    Promise.resolve().then(() => {
      callCancel.forEach(func => {
        func(color, prevColor);
      });
    });
  }
};

export const event_change_enable = (enable: boolean) => dispatch => {
  let a = change_enable(enable);
  let b = change_description(default_description);
  let obj = connect_obj(a, b);
  dispatch(change_store(obj));
};

export const event_change_options = (style_options: IOptions) => (
  dispatch,
  getStore,
) => {
  let { options } = getStore();
  let nw_obj = {};
  for (let key in options) {
    nw_obj[key] = {
      ...options[key],
      ...style_options[key],
    };
  }
  let action = {
    type: 'CHANGE_OPTIONS',
    payload: nw_obj,
  };

  dispatch(action);
};

export const event_change_colors = (colors: Icolors[] | []) => dispatch => {
  let action = {
    type: 'CHANGE_USER_COLORS',
    payload: colors,
  };
  dispatch(action);
};
