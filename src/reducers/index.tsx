import { ThemeAction, ThemeStore } from '../interfaces';

export const default_style_options = {
  picker: {
    width: 250,
    height: 140,
  },
  circle: {
    width: 12,
    height: 12,
  },
};

export const default_description = {
  enable: false,
  save: false,
  edit: false,
  remove: false,
  index: 0,
};

export const default_sync = {
  syncColor: [],
  callSave: [],
  callCancel: [],
};

export const InitialState: ThemeStore = {
  H: 0,
  S: 0,
  V: 100,
  opacity: 1,
  rgbMain: [255, 255, 255],
  type: 'rgb',
  prevColor: 'hsl(109, 70%, 39%)',
  models: {
    hex: '#fefefe',
    rgb: [255, 255, 255],
    hsl: [0, 0, 100],
  },
  options: default_style_options,
  enable: false,
  main: false,
  sync: default_sync,
  description: default_description,
  colors: [
    { name: 'Color 1', color: '#F44336', id: 'q' },
    { name: 'Color 2', color: '#E91E63', id: 'w' },
    { name: 'Color 3', color: 'rgb(156, 39, 176)', id: 'e' },
    { name: 'Color 4', color: 'hsl(117, 84%, 46%)', id: 'r' },
    { name: 'Color 5', color: '#3F51B5', id: 't' },
    { name: 'Color 6', color: '#2196F3', id: 'y' },
    { name: 'Color 7', color: '#03A9F4', id: 'u' },
    { name: 'Color 8', color: '#009688', id: 'i' },
    { name: 'Color 9', color: '#4CAF50', id: 'o' },
    { name: 'Color 10', color: '#8BC34A', id: 'p' },
    { name: 'Color 11', color: '#CDDC39', id: 'a' },
    { name: 'Color 12', color: '#FFEB3B', id: 's' },
    { name: 'Color 13', color: '#FFC107', id: 'd' },
    { name: 'Color 14', color: '#FF5722', id: 'f' },
    { name: 'Color 15', color: '#795548', id: 'g' },
    { name: 'Color 16', color: '#9E9E9E', id: 'h' },
    { name: 'Color 17', color: '#607D8B', id: 'j' },
  ],
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case 'CHANGE_RGB':
      return { ...state, rgbMain: action.payload };

    case 'CHANGE_OPACITY': {
      return { ...state, opacity: action.payload };
    }
    case 'CHANGE_TYPE': {
      return { ...state, type: action.payload };
    }

    case 'CHANGE_MODEL': {
      let type = state.type;
      return { ...state, models: { ...state.models, [type]: action.payload } };
    }
    case 'CHANGE_USER_COLORS': {
      return {
        ...state,
        colors: action.payload,
      };
    }
    case 'CHANGE_PREV_COLOR': {
      return {
        ...state,
        prevColor: action.payload,
      };
    }
    case 'CHANGE_DESCRIPTION': {
      return {
        ...state,
        description: action.payload,
      };
    }
    case 'CHANGE_H':
      return {
        ...state,
        H: action.payload == null ? state.H : action.payload,
      };
    case 'CHANGE_S':
      return {
        ...state,
        S: action.payload == null ? state.S : action.payload,
      };
    case 'CHANGE_V':
      return {
        ...state,
        V: action.payload == null ? state.V : action.payload,
      };

    case 'CHANGE_STORE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CHANGE_OPTIONS': {
      const style_options = action.payload;
      let obj = {};
      for (let key in default_style_options) {
        obj[key] = {
          ...default_style_options[key],
          ...style_options[key],
        };
      }

      return {
        ...state,
        options: obj,
      };
    }

    default:
      return state;
  }
};

export default reducer;
