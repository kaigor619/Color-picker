import React from 'react';
import { shallow } from 'enzyme';
import { BtnChangeType } from './BtnChangeType';

describe('News container', () => {
  const props = {
    type: 'rgb',
    name: 'rgb',
    text: 'rgb',
    changeType: () => {},
  };

  it('Есть у компонента active class (type==name)', () => {
    const myComponent = shallow(<BtnChangeType {...props} />);
    expect(myComponent.find('button').hasClass('active')).toEqual(true);
  });
  it('Есть у компонента active class (type!==name)', () => {
    props.name = 'hex';
    const myComponent = shallow(<BtnChangeType {...props} />);
    expect(myComponent.find('button').hasClass('active')).toEqual(false);
  });
});
