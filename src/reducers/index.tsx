import { ThemeAction, ThemeStore } from "../interfaces";

const InitialState: ThemeStore = {
  H: 0,
  S: 0,
  V: 100,
  opacity: 1,
  rgb_val: [255, 255, 255],
  type: "rgb",
  prevColor: {
    rgb_val: [0, 145, 255],
    opacity: 0.5
  },
  models: {
    hex: "#ffffff",
    hsl: [0, 0, 100],
    rgb: [255, 255, 255]
  }
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case "ADD_RGB":
      return { ...state, rgb_val: action.payload };

    case "CHANGE_OPACITY": {
      return { ...state, opacity: action.payload };
    }
    case "CHANGE_TYPE": {
      return { ...state, type: action.payload };
    }

    case "CHANGE_HEX": {
      return { ...state, models: { ...state.models, hex: action.payload } };
    }

    case "CHANGE_MODEL_VAL": {
      let type = state.type;
      return { ...state, models: { ...state.models, [type]: action.payload } };
    }

    case "CHANGE_HEX":
      return {
        ...state,
        model: {
          ...state.model,
          hex: action.payload
        }
      };
    case "CHANGE_HSL":
      return {
        ...state,
        model: {
          ...state.model,
          hsl: action.payload
        }
      };
    case "CHANGE_RGB":
      return {
        ...state,
        model: {
          ...state.model,
          rgb: action.payload
        }
      };

    case "CHANGE_H":
      return {
        ...state,
        H: action.payload == null ? state.H : action.payload
      };
    case "CHANGE_S":
      return {
        ...state,
        S: action.payload == null ? state.S : action.payload
      };
    case "CHANGE_V":
      return {
        ...state,
        V: action.payload == null ? state.V : action.payload
      };

    default:
      return state;
  }
};

export default reducer;
