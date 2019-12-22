import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputCell } from './InputCell';

describe('InputCell', () => {
  const props = {
    model: [12, 13, 14],
    opacity: 0.7,
    maxLength: 9,
    index: 2,
    changeModel: (val: string | number, index: number) => {},
    changeOpacity: (opacity: number) => {},
  };

  it('Проверка правильного state', () => {
    const myComponent = mount(<InputCell {...props} />);
    let label = myComponent.state('label');
    expect(+label).toEqual(14);
  });
  //   it('Рендерится ли DescriptionColor', () => {
  //     const myComponent = mount(<Colors {...props} />);
  //     expect(myComponent.exists('.cp_descr-color')).toEqual(false);
  //   });
});
