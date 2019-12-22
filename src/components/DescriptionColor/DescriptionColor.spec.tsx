import React from 'react';
import { shallow, mount } from 'enzyme';
import { DescriptionColor } from './DescriptionColor';
import store from '../../store/store';
import Model from '../../options/modelsColor';

describe('Colors', () => {
  const props = {
    description: {
      remove: false,
      save: false,
      enable: true,
      edit: false,
      index: 1,
    },
    change_description: () => {},
    change_colors: () => {},
  };

  it('Отрисовка Description color (enable==true)', () => {
    const myComponent = mount(<DescriptionColor {...props} />);
    expect(myComponent.isEmptyRender()).toEqual(false);
  });
  it('Проверка цвета и названия в state', () => {
    const myComponent = mount(<DescriptionColor {...props} />);
    let { colors } = store.getState();
    let { index } = props.description;
    let { color, name } = myComponent.state();
    let { color: c, name: n } = colors[index];
    expect([color, name]).toEqual([c, n]);
  });
  it('Проверка name in state (save=true)', () => {
    props.description.save = true;
    const myComponent = mount(<DescriptionColor {...props} />);
    let { colors } = store.getState();
    let { name } = myComponent.state();
    let n = 'Color ' + (colors.length + 1);
    expect(name).toEqual(n);
  });
  it('Проверка name in state (remove=true)', () => {
    props.description.remove = true;
    props.description.save = false;
    const myComponent = mount(<DescriptionColor {...props} />);
    let { colors } = store.getState();
    let { index } = props.description;
    let { color, name } = myComponent.state();
    let { color: c, name: n } = colors[index];
    expect([color, name]).toEqual([c, n]);
  });
});
