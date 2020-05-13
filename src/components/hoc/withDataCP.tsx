import React from 'react';
import * as Action from '../../actions';
import { IColorsOptions, IOptions, Icolors } from '../../interfaces';
import store from '../../store/store';

function changeEnable(enable: boolean) {
  Action.event_change_enable(enable)(store.dispatch);
}

const WithDataCP = WrappedComponent => {
  class CP extends React.Component<any> {
    setColors(colors: Icolors[]) {
      Action.event_change_colors(colors)(store.dispatch);
    }
    setStyleOptions(style_options: IOptions) {
      Action.event_change_options(style_options)(
        store.dispatch,
        store.getState,
      );
    }
    setColor(...args) {
      let color: string = args[0];
      let options = args[1];

      let object: IColorsOptions = {
        color,
        ...options,
      };
      Action.eventAddColor(object)(store.dispatch, store.getState);
    }
    switchOn() {
      changeEnable(true);
    }
    switchOff() {
      changeEnable(false);
    }
    colorsCP = {
      add: (color: string, name: string) => {
        let { colors } = store.getState();
        let cls = colors.slice();
        let time = new Date().getTime();
        let id = name + ' ' + time;
        cls.push({ name, color, id });
        Action.event_change_colors(cls)(store.dispatch);
      },
      changeAllColors: (colors: Icolors[]) => {
        Action.event_change_colors(colors)(store.dispatch);
      },
      remove: (str: string) => {
        let { colors } = store.getState();
        let cls = colors.slice();
        let ind = cls.findIndex(({ name }) => name === str);
        if (ind !== -1) cls.splice(ind, 1);
        Action.event_change_colors(cls)(store.dispatch);
      },
      removeAllColors: () => {
        Action.event_change_colors([])(store.dispatch);
      },
      change: (str: string, nwstr) => {
        let { colors } = store.getState();
        let cls = colors.slice();
        let ind = cls.findIndex(({ name }) => name === str);
        if (ind !== -1) cls[ind].name = nwstr;
        Action.event_change_colors(cls)(store.dispatch);
      },
      getColors: () => {
        let { colors } = store.getState();
        let cls = colors.map(elem => ({ ...elem }));
        return cls;
      },
    };
    render() {
      const {
        setColors,
        setStyleOptions,
        setColor,
        switchOn,
        switchOff,
        colorsCP,
      } = this;
      let events = {
        setColors,
        setStyleOptions,
        setColor,
        switchOn,
        switchOff,
        colorsCP,
      };
      return <WrappedComponent {...this.props} {...events} />;
    }
  }

  return CP;
};

export default WithDataCP;
