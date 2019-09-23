import * as Action from "./index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import expect from "expect";
import { InitialState } from "../reducers";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Тестирование Actions", () => {
  it("rgb => hex", () => {
    const action = {
      type: "CHANGE_RGB",
      payload: [77, 92, 66]
    };
    expect(Action.change_rgbMain(action.payload)).toEqual(action);
  });

  it("changeHSV full", () => {
    const expectedActions = [
      { type: "CHANGE_H", payload: 1 },
      { type: "CHANGE_S", payload: 2 },
      { type: "CHANGE_V", payload: 3 }
    ];
    const store = mockStore(InitialState);
    store.dispatch(Action.change_HSV([1, 2, 3]));

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("changeHSV not full", () => {
    const expectedActions = [
      { type: "CHANGE_S", payload: 2 },
      { type: "CHANGE_V", payload: 3 }
    ];
    const store = mockStore(InitialState);
    store.dispatch(Action.change_HSV([null, 2, 3]));

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("Синхронизация HSV => rgbMain", () => {
    const expectedActions = [{ type: "CHANGE_RGB", payload: [255, 0, 0] }];

    const state = {
      ...InitialState,
      H: 0,
      S: 100,
      V: 100
    };
    const store = mockStore(state);
    store.dispatch(Action.compo_sync_rgbMain());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("Синхнонизация rgbMain => model", () => {
    const expectedActions = [{ type: "CHANGE_MODEL", payload: [0, 27, 36] }];

    const state = {
      ...InitialState,
      rgbMain: [117, 67, 67],
      type: "hsl",
      opacity: 0.76
    };
    const store = mockStore(state);
    store.dispatch(Action.compo_sync_model());

    expect(store.getActions()).toEqual(expectedActions);
  });
  it("Изменение enable и index", () => {
    const expectedActions = [
      { type: "CHANGE_USER_COLORS_ENABLE", payload: true },
      { type: "CHANGE_USER_COLORS_INDEX", payload: 2 }
    ];

    const state = {
      ...InitialState
    };
    const store = mockStore(state);
    store.dispatch(Action.compo_change_colors_enable(true, 2));

    expect(store.getActions()).toEqual(expectedActions);
  });
});
