import * as Action from './index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import { InitialState } from '../reducers';
import Model from '../options/modelsColor';
import Convert from '../options/convert';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Тестирование Actions', () => {
  it('eventHSV', () => {
    let hsv = [117, 91, 85];
    let [H, S, V] = hsv;
    let rgbMain = Convert.hsv_rgb(H, S, V);
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          H,
          S,
          V,
          rgbMain,
          models: {
            ...InitialState.models,
            rgb: rgbMain,
          },
        },
      },
    ];

    const store = mockStore(() => InitialState);
    store.dispatch(Action.eventHSV(hsv));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventOpacity', () => {
    let opacity = 0.8;
    let rgbMain = [29, 217, 20];
    let state = {
      ...InitialState,
      type: 'hex',
      rgbMain,
      models: {
        ...InitialState.models,
        hex: '#1dd914',
      },
    };
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          opacity,
          models: {
            ...state.models,
            hex: '#1dd914cc',
          },
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventOpacity(opacity));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventBtnChangeType', () => {
    let type = 'hsl';
    let rgbMain = [29, 217, 20];
    let state = {
      ...InitialState,
      rgbMain,
    };
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          type,
          models: {
            ...state.models,
            hsl: [117, 83, 46],
          },
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventBtnChangeType(type));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('event_change_colors', () => {
    let colors = [
      { name: 'fefe', color: 'rgb(0,0,0)', id: 'fefe' },
      { name: 'dwdw', color: 'hsl(12, 13%, 15%)', id: 'hyhy' },
      { name: 'htht', color: '#fff', id: 'llfr' },
    ];
    let state = InitialState;

    const expectedActions = [
      {
        type: 'CHANGE_USER_COLORS',
        payload: colors,
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.event_change_colors(colors));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventChangeDescription', () => {
    let description = {
      enable: true,
      edit: true,
      remove: false,
      save: false,
      index: 1,
    };
    let state = InitialState;

    const expectedActions = [
      {
        type: 'CHANGE_DESCRIPTION',
        payload: description,
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventChangeDescription(description));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventClickSwatch', () => {
    let index = 3;
    let description = {
      enable: true,
      edit: false,
      remove: false,
      save: false,
      index,
    };
    let color = 'hsl(117, 84%, 46%)';
    let hsl = [117, 84, 46];
    let hsv = [117, 91, 84];
    let rgbMain = [29, 216, 19];
    let opacity = 1;
    let [H, S, V] = hsv;
    let type = 'hsl';
    let models = {
      ...InitialState.models,
      hsl,
    };

    let state = InitialState;

    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          H,
          S,
          V,
          type,
          opacity,
          rgbMain,
          models,
          description,
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventClickSwatch(index));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventClickAddSwatch', () => {
    let description = {
      enable: true,
      edit: false,
      remove: false,
      save: true,
      index: 0,
    };
    let state = InitialState;

    const expectedActions = [
      {
        type: 'CHANGE_DESCRIPTION',
        payload: description,
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventClickAddSwatch());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventChangeInputModel', () => {
    let val = 20;
    let index = 2;
    let hsl = [205, 79, 20];
    let rgbMain = Model.hsl.hsl_rgb(hsl);
    let hsv = Convert.rgb_hsv(rgbMain);
    let [H, S, V] = hsv;
    let models = {
      ...InitialState.models,
      hsl,
    };

    let state = {
      ...InitialState,
      type: 'hsl',
      models: {
        ...InitialState.models,
        hsl: [205, 79, 46],
      },
    };

    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          H,
          S,
          V,
          rgbMain,
          models,
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventChangeInputModel(val, index));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventChangeInputOpacity', () => {
    let opacity = 0.65;

    let state = InitialState;

    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          opacity,
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventChangeInputOpacity(opacity));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventClickPrevColor', () => {
    let description = {
      enable: false,
      edit: false,
      remove: false,
      save: false,
      index: 0,
    };
    let color = 'hsl(117, 84%, 46%)';
    let hsl = [117, 84, 46];
    let hsv = [117, 91, 84];
    let rgbMain = [29, 216, 19];
    let opacity = 1;
    let [H, S, V] = hsv;
    let type = 'hsl';
    let models = {
      ...InitialState.models,
      hsl,
    };

    let state = {
      ...InitialState,
      prevColor: color,
    };

    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          H,
          S,
          V,
          type,
          opacity,
          rgbMain,
          models,
          description,
          prevColor: color,
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventClickPrevColor());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventAddColor', () => {
    let color = 'hsl(117, 84%, 46%)';
    let options = {
      color,
    };
    let description = {
      enable: false,
      edit: false,
      remove: false,
      save: false,
      index: 0,
    };
    let hsl = [117, 84, 46];
    let hsv = [117, 91, 84];
    let rgbMain = [29, 216, 19];
    let opacity = 1;
    let [H, S, V] = hsv;
    let type = 'hsl';
    let models = {
      ...InitialState.models,
      hsl,
    };

    let state = {
      ...InitialState,
    };

    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          H,
          S,
          V,
          type,
          opacity,
          rgbMain,
          models,
          description,
          prevColor: color,
          main: false,
          enable: true,
          sync: {
            syncColors: [],
            callSave: [],
            callCancel: [],
          },
        },
      },
    ];

    const store = mockStore(state);
    store.dispatch(Action.eventAddColor(options));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventClickOk', () => {
    let state = {
      ...InitialState,
      enable: true,
      main: true,
      sync: {
        syncColor: [],
        callSave: [],
        callCancel: [],
      },
    };
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          main: false,
          enable: false,
          sync: {
            syncColors: [],
            callSave: [],
            callCancel: [],
          },
        },
      },
    ];
    const store = mockStore(state);
    store.dispatch(Action.eventClickOk());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('eventClickCancel', () => {
    let description = {
      enable: false,
      edit: false,
      remove: false,
      save: false,
      index: 0,
    };
    let state = InitialState;
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          enable: false,
          description,
        },
      },
    ];
    const store = mockStore(state);
    store.dispatch(Action.event_change_enable(false));
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('event_change_enable', () => {
    let state = {
      ...InitialState,
      enable: true,
      main: true,
      sync: {
        syncColor: [],
        callSave: [],
        callCancel: [],
      },
    };
    const expectedActions = [
      {
        type: 'CHANGE_STORE',
        payload: {
          main: false,
          enable: false,
          sync: {
            syncColors: [],
            callSave: [],
            callCancel: [],
          },
        },
      },
    ];
    const store = mockStore(state);
    store.dispatch(Action.eventClickCancel());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
