import React from 'react';
import { shallow } from 'enzyme';
// import { NewsContainer } from './NewsContainer';

describe('News container', () => {
  const props = {
    // описываем props
    news: {
      data: [],
      isLoading: false,
      errorMsg: null,
    },
    // функция получения новостей onGetNews. Ее содержимое тестировать не нужно.
    // Но нам потребуется протестировать, что функция была вызвана в componentDidMount
    onGetNews: () => {},
  };

  // здесь будут будущие it
});
