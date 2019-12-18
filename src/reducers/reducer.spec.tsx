import reducer, { InitialState } from './index';

describe('Проверка reducer', () => {
  it('Изменение rgbMain', () => {
    const action = {
      type: 'CHANGE_RGB',
      payload: [0, 0, 0],
    };
    const state = {
      ...InitialState,
      rgbMain: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение model', () => {
    const action = {
      type: 'CHANGE_MODEL',
      payload: '#fff',
    };
    const state = {
      ...InitialState,
      models: {
        ...InitialState.models,
        [InitialState.type]: action.payload,
      },
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение opacity', () => {
    const action = {
      type: 'CHANGE_OPACITY',
      payload: 0.7,
    };
    const state = {
      ...InitialState,
      opacity: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение prevColor', () => {
    const action = {
      type: 'CHANGE_PREV_COLOR',
      payload: 'rgb(32, 178, 20)',
    };
    const state = {
      ...InitialState,
      prevColor: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение description', () => {
    const action = {
      type: 'CHANGE_DESCRIPTION',
      payload: {
        enable: true,
        remove: false,
        edit: false,
        save: false,
        index: 0,
      },
    };
    const state = {
      ...InitialState,
      description: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение options', () => {
    const action = {
      type: 'CHANGE_OPTIONS',
      payload: {
        picker: {
          width: 250,
        },
      },
    };
    const state = {
      ...InitialState,
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
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение type', () => {
    const action = {
      type: 'CHANGE_TYPE',
      payload: 'hex',
    };
    const state = {
      ...InitialState,
      type: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение colors', () => {
    const action = {
      type: 'CHANGE_USER_COLORS',
      payload: [
        { name: 'Color 3', color: '#e91e63' },
        { name: 'Color 4', color: '#ff0000ff' },
      ],
    };
    const state = {
      ...InitialState,
      colors: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение H', () => {
    const action = {
      type: 'CHANGE_H',
      payload: 20,
    };
    const state = {
      ...InitialState,
      H: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение S', () => {
    const action = {
      type: 'CHANGE_S',
      payload: 20,
    };
    const state = {
      ...InitialState,
      S: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
  it('Изменение V', () => {
    const action = {
      type: 'CHANGE_V',
      payload: 20,
    };
    const state = {
      ...InitialState,
      V: action.payload,
    };

    expect(reducer(InitialState, action)).toEqual(state);
  });
});
