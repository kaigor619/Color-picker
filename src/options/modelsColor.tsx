let model = {
  rgb: {
    getArr: (str: string): { val: number[]; opacity: number } => {
      let str_arr = str
        .substring(str.indexOf("(") + 1, str.length - 1)
        .replace(/ /g, "")
        .split(",");

      let val: number[] = [];
      let opacity: number = 1;

      str_arr.forEach((item, i) => {
        val[i] = +item;
      });

      if (str.indexOf("rgba") >= 0 && val[3]) {
        opacity = +val[3].toFixed(2);
        val.splice(-1, 1);
      } else opacity = 1;

      var rgba_obj = {
        val,
        opacity
      };
      return rgba_obj;
    }
  },
  hsl: {
    getArr: (str: string) => {
      let str_arr = str
        .substring(str.indexOf("(") + 1, str.length - 1)
        .replace(/ /g, "")
        .split(",");

      let val: number[] = [];
      let opacity: number = 1;

      str_arr.forEach((item, i) => {
        val[i] = +item;
      });

      if (str.indexOf("hsla") >= 0 && val[3]) {
        opacity = +val[3].toFixed(2);
        val.splice(-1, 1);
      } else opacity = 1;

      var rgba_obj = {
        val,
        opacity
      };
      return rgba_obj;
    }
  },
  hex: {
    getArr: (str: string): { val: string; opacity: number } => {
      let hex = str.replace("#", "");
      let a: string = "";
      if (8 === hex.length) {
        a = hex.substring(6, 8);
      }
      if (1 === a.length) {
        a += a;
      }

      let opacity: number = +(+parseInt(a, 16) / 255).toFixed(2);
      return {
        val: str,
        opacity
      };
    }
  }
};

export default model;
