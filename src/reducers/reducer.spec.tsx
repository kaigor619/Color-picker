import reducer, { InitialState } from "./index";

describe("Проверка reducer", () => {
  it("Изменение rgbMain", () => {
    const action = {
      type: "CHANGE_RGB",
      payload: [0, 0, 0]
    };
    const state = {
      ...InitialState,
      rgbMain: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение opacity", () => {
    const action = {
      type: "CHANGE_OPACITY",
      payload: 0.7
    };
    const state = {
      ...InitialState,
      opacity: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение type", () => {
    const action = {
      type: "CHANGE_TYPE",
      payload: "hex"
    };
    const state = {
      ...InitialState,
      type: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение hex", () => {
    const action = {
      type: "CHANGE_HEX",
      payload: "#000000"
    };
    const state = {
      ...InitialState,
      models: {
        ...InitialState.models,
        hex: "#000000"
      }
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение index", () => {
    const action = {
      type: "CHANGE_USER_COLORS_INDEX",
      payload: 2
    };
    const state = {
      ...InitialState,
      userColors: {
        ...InitialState.userColors,
        description: {
          ...InitialState.userColors.description,
          index: action.payload
        }
      }
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение edit", () => {
    const action = {
      type: "CHANGE_USER_COLORS_EDIT",
      payload: true
    };
    const state = {
      ...InitialState,
      userColors: {
        ...InitialState.userColors,
        description: {
          ...InitialState.userColors.description,
          edit: action.payload
        }
      }
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение enable", () => {
    const action = {
      type: "CHANGE_USER_COLORS_ENABLE",
      payload: true
    };
    const state = {
      ...InitialState,
      userColors: {
        ...InitialState.userColors,
        description: {
          ...InitialState.userColors.description,
          enable: action.payload
        }
      }
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение colors", () => {
    const action = {
      type: "CHANGE_USER_COLORS",
      payload: [
        { name: "Color 3", color: "#e91e63" },
        { name: "Color 4", color: "#ff0000ff" }
      ]
    };
    const state = {
      ...InitialState,
      userColors: {
        ...InitialState.userColors,
        colors: action.payload
      }
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение H", () => {
    const action = {
      type: "CHANGE_H",
      payload: 20
    };
    const state = {
      ...InitialState,
      H: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение S", () => {
    const action = {
      type: "CHANGE_S",
      payload: 20
    };
    const state = {
      ...InitialState,
      S: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it("Изменение S", () => {
    const action = {
      type: "CHANGE_S",
      payload: 20
    };
    const state = {
      ...InitialState,
      S: action.payload
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
});
