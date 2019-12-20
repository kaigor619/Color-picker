import React from 'react';
import { shallow, mount } from 'enzyme';
import { Colors } from './Colors';

describe('Colors', () => {
  const props = {
    colors: [
      { name: 'black', color: 'rgb(0,0,0)', id: 'qw' },
      { name: 'white', color: 'rgb(255,255,255)', id: 'rt' },
      { name: 'easy white', color: '#f3f3f3', id: 'ew' },
    ],
    descr_enable: false,
    swatchClick: () => {},
    swatchAdd: () => {},
  };

  it('Отрисовуются ли все цвета', () => {
    const myComponent = mount(<Colors {...props} />);
    expect(myComponent.find('.cp_swatch-color')).toHaveLength(3);
  });
  it('Рендерится ли DescriptionColor', () => {
    const myComponent = mount(<Colors {...props} />);
    expect(myComponent.exists('.cp_descr-color')).toEqual(false);
  });
});
