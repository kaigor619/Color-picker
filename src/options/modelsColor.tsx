import Convert from "./convert";

let Model = {
  rgb: {
    rgb_rgb: (rgb: number[]) => {
      return rgb;
    },
    symbolInString: "rgb",
    getStr(rgb_arr: number[]) {
      return "rgb(" + rgb_arr.join(",") + ")";
    },
    getString: function(rgb_arr: number[], opacity: number): string {
      let str = "";
      if (opacity == 1) str = "rgb(" + rgb_arr.join(",") + ")";
      else str = "rgba(" + rgb_arr.join(",") + ", " + opacity + ")";

      return str;
    },
    getWorkView: (str: string): { val: number[]; opacity: number } => {
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
    rgb_hsl: Convert.rgb_hsl,
    hsl_rgb: Convert.hsl_rgb,
    symbolInString: "hsl",
    getString: function(hsl_arr: number[], opacity: number): string {
      let str = "";
      if (opacity == 1)
        str = `hsla(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%)`;
      // else str = "hsla(" + hsl_arr.[0] + ", " + opacity + ")";
      else
        str = `hsla(${hsl_arr[0]}, ${hsl_arr[1]}%, ${hsl_arr[2]}%, ${opacity})`;

      return str;
    },
    getWorkView: (str: string) => {
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
    getWorkView: (value: string) => {
      let hex = value.replace("#", "");
      let opacity = 1;
      let a = "ff";
      if (hex.length == 8) {
        a = hex.substring(6, 8);
        if ("undefined" === typeof a) {
          a = "ff";
        }
        opacity = +(+parseInt(a, 16) / 255).toFixed(2);
      }

      let hex_obj = {
        val: hex,
        opacity
      };
      return hex_obj;
    },
    getString: function(hex: string, opacity: number): string {
      return hex;
    },
    rgb_hex: (rgb: number[], opacity: number) => {
      let hex = Convert.rgb_hex(rgb, opacity);
      let opacity_str = Model.hex.getOpacity(opacity);
      if (opacity_str != "ff") hex += opacity_str;

      return hex;
    },
    getOpacity: (opacity: number) => {
      let a_str = Math.round(opacity * 255).toString(16);
      if (a_str.length == 1) a_str = "0" + a_str;

      return a_str;
    },
    hex_rgb: Convert.hex_rgb,
    symbolInString: "#"
  }
};

export default Model;
