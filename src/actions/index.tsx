import {
  IDescription,
  Ifunctions,
  IUser_options_functions,
} from '../interfaces';
import Convert from '../options/convert';
import Model from '../options/modelsColor';
import Checking from '../options/checking';

let virtualStore = {};

// Соединение обьектов в один
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
  const { type, opacity } = store.cp_settings;
  const { models } = store;
  const { syncColors, main } = store.user_options.functions;

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

export const change_cp_settings = (obj, store) => {
  return { cp_settings: { ...store.cp_settings, ...obj } };
};
export const change_user_options = (obj, store) => {
  return { user_options: { ...store.user_options, ...obj } };
};
export const change_user_options_style = (obj, store) => {
  return {
    user_options: {
      ...store.user_options,
      style: { ...store.user_options.style, ...obj },
    },
  };
};
export const change_user_options_functions = (obj, store) => {
  return {
    user_options: {
      ...store.user_options,
      functions: { ...store.user_options.functions, ...obj },
    },
  };
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
  if (S !== null) objStore['S'] = S;
  if (V !== null) objStore['V'] = V;

  return objStore;
};

// Изменение Типа и изменение полей model
export const cx_type_model = (type: string, store) => {
  let a = change_type(type);
  let b = sync_model_from_rgbMain({ ...store, type });
  let c = change_cp_settings(a, store);
  return connect_obj(c, b);
};

// Изменение opacity и hex
export const cx_opacity_hex = (opacity: number, store) => {
  const {
    models,
    cp_settings: { type },
  } = store;
  const {
    main,
    functions: { syncColors },
  } = store.user_options;
  let a = change_opacity(opacity);
  let b =
    type === 'hex' ? sync_model_from_rgbMain({ ...store, ...a }) : { models };
  let cp_settings = change_cp_settings(a, store);

  if (main) {
    let color = Model[type].getString(b.models[type], a.opacity);
    syncColors.forEach(element => {
      element(color);
    });
  }
  return connect_obj(cp_settings, b);
};

// Синхнонизация rgbMain => model
export const sync_model_from_rgbMain = store => {
  const { rgbMain, type, opacity } = store.cp_settings;
  let modelValue = Model[type]['rgb_' + type](rgbMain, opacity);
  let a = change_model(modelValue, store);

  return a;
};

// Изменение HSV и rgbMain и model
export const cx_HSV_rgbMain_model = (hsv: any, store) => {
  let { cp_settings } = store;
  let { type, opacity } = store.cp_settings;
  let { models } = store;
  let objStore = Object.assign({}, cp_settings);
  let [H, S, V] = hsv;

  let h, s, v, rgbMain;

  if (H !== null) h = H;
  else H = cp_settings['H'];

  if (S !== null) s = S;
  else S = cp_settings['S'];

  if (V !== null) v = V;
  else V = cp_settings['V'];

  rgbMain = Convert.hsv_rgb(H, S, V);

  let b = sync_model_from_rgbMain({
    ...store,
    type,
    opacity,
    rgbMain,
    models,
  });

  let cp_setts = change_cp_settings({ H, S, V, rgbMain }, store);

  return connect_obj(cp_setts, b);
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
  let k = change_prevColor(value, main);
  let d = change_model(val, { ...store, type });
  let cp_settings = connect_obj(a, b, e, c, k);
  return connect_obj(cp_settings, d);
};

export const cx_HSV_rgbMain_model_from_model = (
  value: string | number,
  index: number,
  store,
) => {
  const { models } = store;
  const { type } = store.cp_settings;
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

  let cp_settings = connect_obj(a, b);

  let c = change_model(val, store);

  return connect_obj(cp_settings, c);
};

export const eventHSV = hsv => (dispatch, getStore) => {
  const store = getStore();
  let obj = cx_HSV_rgbMain_model(hsv, store);
  // console.log(obj);
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
  let obj = change_colors(colors);
  dispatch(change_store(obj));
};

export const eventChangeDescription = description => (dispatch, getStore) => {
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
  let obj = addColor(store.cp_settings.prevColor, true, store);

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

  let user_options = change_user_options_functions(
    connect_obj(b, c, d, e),
    store,
  );

  let k;
  if (!enable) k = change_enable(true);

  let obj = connect_obj(a, k, user_options);

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

  let cp_settings = change_user_options_functions(
    connect_obj(b, c, d, e),
    getStore(),
  );

  let obj = connect_obj(a, { cp_settings });

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

  let cp_settings = change_user_options_functions(
    connect_obj(b, c, d, e),
    getStore(),
  );

  let obj = connect_obj(a, { cp_settings });
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
  let obj = connect_obj(a);
  dispatch(change_store(obj));
};

export const event_change_resize = () => dispatch => {
  let action = {
    type: 'CHANGE_RESIZE',
  };
  dispatch(action);
};
export const event_change_options = (options: any) => dispatch => {
  let action = {
    type: 'CHANGE_USER_OPTIONS_STYLE',
    payload: options,
  };
  // dispatch(action);
};
