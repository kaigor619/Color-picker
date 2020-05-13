import React from 'react';
import { shallow, mount } from 'enzyme';
import { InputCell } from './InputCell';

describe('InputCell', () => {
  let props: any = {
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
  it('Проверка правильного state', () => {
    props['hexBool'] = true;
    props.model = '#f3f3f3';
    const myComponent = mount(<InputCell {...props} />);
    let label = myComponent.state('label');
    expect(label).toEqual(props.model);
  });
  it('Проверка правильного state', () => {
    props = {
      model: [12, 13, 14],
      opacity: 0.7,
      maxLength: 9,
      index: 2,
      changeModel: (val: string | number, index: number) => {},
      changeOpacity: (opacity: number) => {},
      opacityBool: true,
    };

    const myComponent = mount(<InputCell {...props} />);
    let label = myComponent.state('label');

    expect(+label).toEqual(props.opacity);
  });
});
