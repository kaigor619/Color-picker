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
  check_arrFunctions: (functions): boolean => {
    let bool = false;

    if (functions === undefined) return false;

    if (typeof functions == 'object' && functions.slice) {
      if (functions.length > 0) {
        if (functions.every(item => typeof item == 'function')) {
          return true;
        }
      }
    }
    return bool;
  },
};

export default Checking;
