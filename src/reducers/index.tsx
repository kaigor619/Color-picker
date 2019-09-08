import { ThemeAction, ThemeStore } from "../interfaces";

const InitialState: ThemeStore = {
  S: 0,
  V: 100,
  H: 0,
  opacity: 1,
  rgb_val: [255, 255, 255],
  type: "rgb",
  prevColor: {
    rgb_val: [0, 145, 255],
    opacity: 0.5
  },
  models: {
    hex: "#000",
    hsl: [114, 0, 0],
    rgb: [66, 135, 245]
  }
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case "ADD_RGB":
      return { ...state, rgb_val: action.payload };

    case "CHANGE_OPACITY": {
      return { ...state, opacity: action.payload };
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
