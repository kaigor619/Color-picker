import React from 'react';
import { shallow, mount } from 'enzyme';
import { DescriptionColor } from './DescriptionColor';

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
  //   it('Рендерится ли DescriptionColor', () => {
  //     const myComponent = mount(<Colors {...props} />);
  //     expect(myComponent.exists('.cp_descr-color')).toEqual(false);
  //   });
});
