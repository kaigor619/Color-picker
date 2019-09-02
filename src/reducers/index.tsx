import { ThemeAction, ThemeStore } from "../interfaces";

const InitialState: ThemeStore = {
  S: 0,
  V: 100,
  H: 0,
  opacity: 1,
  rgb_val: [255, 255, 255]
};

const reducer = (state: any = InitialState, action: ThemeAction) => {
  switch (action.type) {
    case "ADD_COLOR":
      return { ...state, rgb_val: action.payload };
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
