import * as Action from "./index";

describe("Тестирование Actions", () => {
  it("rgb => hex", () => {
    const action = {
      type: "CHANGE_RGB",
      payload: [77, 92, 66]
    };
    expect(Action.change_rgbMain(action.payload)).toEqual(action);
  });
  it("rgb => hex", () => {
    const action = {
      type: "CHANGE_RGB",
      payload: [77, 92, 66]
    };
    expect(Action.change_rgbMain(action.payload)).toEqual(action);
  });
});
