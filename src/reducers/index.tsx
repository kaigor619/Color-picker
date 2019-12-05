import { ThemeAction, ThemeStore } from '../interfaces';

export const default_options_style = {
  picker: {
    width: 250,
    height: 140,
  },
  circle: {
    width: 12,
    height: 12,
  },
};
export const default_options_functions = {
  main: false,
  syncColor: [],
  callSave: [],
  callCancel: [],
};
export const default_description = {
  enable: false,
  save: false,
  edit: false,
  remove: false,
  index: 0,
};

export const InitialState: ThemeStore = {
  cp_settings: {
    H: 0,
    S: 0,
    V: 100,
    opacity: 1,
    rgbMain: [255, 255, 255],
    type: 'rgb',
    prevColor: 'hsl(109, 70%, 39%)',
  },
  models: {
    hex: '#fefefe',
    hsl: [0, 0, 100],
    rgb: [255, 255, 255],
  },
  user_options: {
    style: default_options_style,
    functions: default_options_functions,
  },
  description: default_description,

  enable: false,
  resize: false,
  colors: [
    { name: 'Color 1', color: '#F44336' },
    { name: 'Color 2', color: '#E91E63' },
    { name: 'Color 3', color: 'rgb(156, 39, 176)' },
    { name: 'Color 4', color: 'hsl(262, 52%, 47%)' },
    { name: 'Color 5', color: '#3F51B5' },
    { name: 'Color 6', color: '#2196F3' },
    { name: 'Color 7', color: '#03A9F4' },
    { name: 'Color 8', color: '#009688' },
    { name: 'Color 9', color: '#4CAF50' },
    { name: 'Color 10', color: '#8BC34A' },
    { name: 'Color 11', color: '#CDDC39' },
    { name: 'Color 12', color: '#FFEB3B' },
    { name: 'Color 13', color: '#FFC107' },
    { name: 'Color 14', color: '#FF5722' },
    { name: 'Color 15', color: '#795548' },
    { name: 'Color 16', color: '#9E9E9E' },
    { name: 'Color 17', color: '#607D8B' },
  ],
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case 'CHANGE_CP_SETTINGS':
      return {
        ...state,
        cp_settings: { ...state.cp_settings, ...action.payload },
      };

    case 'CHANGE_MODELS':
      return { ...state, models: { ...action.payload } };

    case 'CHANGE_USER_OPTIONS':
      return {
        ...state,
        user_options: { ...state.user_options, ...action.payload },
      };

    case 'CHANGE_USER_OPTIONS_STYLE': {
      const style_options = action.payload;
      let style = {};
      for (let key in default_options_style) {
        style[key] = {
          ...default_options_style[key],
          ...style_options[key],
        };
      }

      return {
        ...state,
        user_options: {
          ...state.user_options,
          style,
        },
      };
    }

    case 'CHANGE_USER_OPTIONS_FUNCTIONS': {
      return {
        ...state,
        user_options: {
          ...state.user_options,
          functions: { ...default_options_functions, ...action.payload },
        },
      };
    }

    case 'CHANGE_MODEL': {
      let type = state.type;
      return { ...state, models: { ...state.models, [type]: action.payload } };
    }
    case 'CHANGE_COLORS': {
      return {
        ...state,
        colors: action.payload,
      };
    }

    case 'CHANGE_DESCRIPTION': {
      return {
        ...state,
        description: { ...default_description, ...action.payload },
      };
    }
    case 'CHANGE_STORE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    case 'CHANGE_RESIZE': {
      return {
        ...state,
        resize: !state.resize,
      };
    }
    case 'CHANGE_ENABLE': {
      return {
        ...state,
        enable: action.payload,
      };
    }
    case 'CHANGE_USER_OPTIONS_MAIN': {
      return {
        ...state,
        user_options: {
          ...state.user_options,
          functions: { ...state.user_options.functions, main: action.payload },
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
