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
});
