import Convert from './convert';

let Model = {
  rgb: {
    rgb_rgb: (rgb: number[]) => {
      return rgb;
    },
    symbolInString: 'rgb',
    getStr(rgb_arr: number[]) {
      return 'rgb(' + rgb_arr.join(',') + ')';
    },
    getString: function(rgb_arr: number[], opacity: number): string {
      let str = '';
      if (opacity === 1) str = 'rgb(' + rgb_arr.join(',') + ')';
      else str = 'rgba(' + rgb_arr.join(',') + ', ' + opacity + ')';
      return str;
    },
    getWorkView: (str: string): { val: number[]; opacity: number } => {
      let str_arr = str
        .substring(str.indexOf('(') + 1, str.length - 1)
        .replace(/ /g, '')
        .split(',');

      let opacity = 1;

      let val = str_arr.map((item, i) => {
        let res = i === 3 ? +Number(item).toFixed(2) : +parseInt(item);
        return res;
      });

      if (str.indexOf('rgba') >= 0 && val[3]) {
        opacity = val[3];
        val.splice(-1, 1);
      } else opacity = 1;

      let rgba_obj = {
        val,
        opacity,
      };

      return rgba_obj;
    },
  },
  hsl: {
    rgb_hsl: Convert.rgb_hsl,
    hsl_rgb: Convert.hsl_rgb,
    symbolInString: 'hsl',
    getString: function(hsl_arr: number[], opacity: number): string {
      let str = '';
      if (opacity === 1)
        str = `hsl(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%)`;
      else
        str = `hsla(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%, ${opacity})`;

      return str;
    },
    getWorkView: (str: string) => {
      let str_arr = str
        .substring(str.indexOf('(') + 1, str.length - 1)
        .replace(/ /g, '')
        .split(',');

      let opacity = 1;
      // debugger;

      let val = str_arr.map((item, i) => {
        let res = i === 3 ? +Number(item).toFixed(2) : +parseInt(item);
        return res;
      });

      if (str.indexOf('hsla') >= 0 && val[3]) {
        opacity = val[3];
        val.splice(-1, 1);
      } else opacity = 1;

      let rgba_obj = {
        val,
        opacity,
      };
      return rgba_obj;
    },
  },
  hex: {
    getWorkView: (value: string) => {
      // let hex = value.replace('#', '');
      let hex = value;
      let opacity = 1;
      let a = 'ff';
      if (hex.length === 9) {
        a = hex.substring(7, 9);
        if ('undefined' === typeof a) {
          a = 'ff';
        }
        opacity = +(+parseInt(a, 16) / 255).toFixed(2);
      }

      let hex_obj = {
        val: hex,
        opacity,
      };
      return hex_obj;
    },
    getString: function(hex: string, opacity: number): string {
      return hex;
    },
    rgb_hex: (rgb: number[], opacity: number) => {
      let a_str = Model.hex.getOpacity(opacity);

      let [r, g, b] = rgb;
      let r_str = r.toString(16);
      let g_str = g.toString(16);
      let b_str = b.toString(16);

      if (r_str.length === 1) r_str = '0' + r_str;
      if (g_str.length === 1) g_str = '0' + g_str;
      if (b_str.length === 1) b_str = '0' + b_str;

      return '#' + r_str + g_str + b_str + a_str;
    },
    getOpacity: (opacity: number) => {
      let a_str = Math.round(opacity * 255).toString(16);
      a_str = a_str.length === 1 ? '0' + a_str : a_str === 'ff' ? '' : a_str;
      return a_str;
    },
    hex_rgb: Convert.hex_rgb,
    symbolInString: '#',
  },
};

export default Model;
