import { ThemeAction, ThemeStore } from '../interfaces';

function showWork(str: string) {}

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
    hsl: [0, 0, 100],
    rgb: [255, 255, 255],
  },
  options: {
    picker: {
      width: 250,
      height: 140,
    },
    circle: {
      width: 12,
      height: 12,
    },
  },
  enable: false,
  main: false,
  sync: {
    syncColor: [showWork, showWork],
    callSave: [showWork, showWork],
    callCancel: [showWork, showWork],
  },
  description: {
    enable: false,
    save: false,
    edit: false,
    remove: false,
    index: 0,
  },
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
    case 'CHANGE_RGB':
      return { ...state, rgbMain: action.payload };

    case 'CHANGE_OPACITY': {
      return { ...state, opacity: action.payload };
    }
    case 'CHANGE_TYPE': {
      return { ...state, type: action.payload };
    }

    case 'CHANGE_HEX': {
      return { ...state, models: { ...state.models, hex: action.payload } };
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
      console.log({
        ...state,
        ...action.payload,
      });
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
    case 'CHANGE_OPTIONS': {
      const style_options = action.payload;
      return {
        ...state,
        options: action.payload,
      };
    }

    default:
      return state;
  }
};

export default reducer;
