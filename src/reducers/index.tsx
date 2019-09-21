import { ThemeAction, ThemeStore } from "../interfaces";

export const InitialState: ThemeStore = {
  H: 0,
  S: 0,
  V: 100,
  opacity: 1,
  rgbMain: [255, 255, 255],
  type: "rgb",
  prevColor: {
    rgbMain: [0, 145, 255],
    opacity: 0.5
  },
  models: {
    hex: "#ffffff",
    hsl: [0, 0, 100],
    rgb: [255, 255, 255]
  },
  userColors: {
    description: {
      enable: true,
      index: 0,
      edit: false
    },
    colors: [
      { name: "Color 1", color: "#e91e63" },
      { name: "Color 2", color: "#ff0000ff" },
      { name: "Color 3", color: "#e91e63" },
      { name: "Color 4", color: "#ff0000ff" }
    ]
  }
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case "CHANGE_RGB":
      return { ...state, rgbMain: action.payload };

    case "CHANGE_OPACITY": {
      return { ...state, opacity: action.payload };
    }
    case "CHANGE_TYPE": {
      return { ...state, type: action.payload };
    }

    case "CHANGE_HEX": {
      return { ...state, models: { ...state.models, hex: action.payload } };
    }

    case "CHANGE_MODEL": {
      let type = state.type;
      return { ...state, models: { ...state.models, [type]: action.payload } };
    }
    case "CHANGE_USER_COLORS_INDEX": {
      let obj = {
        ...state,
        userColors: {
          ...state.userColors,
          description: {
            ...state.userColors.description,
            index: action.payload
          }
        }
      };

      return obj;
    }

    case "CHANGE_USER_COLORS_EDIT": {
      return {
        ...state,
        userColors: {
          ...state.userColors,
          description: {
            ...state.userColors.description,
            edit: action.payload
          }
        }
      };
    }

    case "CHANGE_USER_COLORS_ENABLE":
      return {
        ...state,
        userColors: {
          ...state.userColors,
          description: {
            ...state.userColors.description,
            enable: action.payload
          }
        }
      };

    case "CHANGE_USER_COLORS": {
      return {
        ...state,
        userColors: { ...state.userColors, colors: action.payload }
      };
    }

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
