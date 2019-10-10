import Model from './modelsColor';

const Checking = {
  isNumber: () => {},
  check_color: (value: string): string => {
    let type = 'rgb';

    let models = Object.keys(Model);

    models.forEach(item => {
      if (value.indexOf(Model[item].symbolInString) > -1) type = item;
    });

    return type;
  },
};

export default Checking;
