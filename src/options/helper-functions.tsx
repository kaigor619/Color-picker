interface ICheckColor {
  type: string;
  val: number[] | number;
  opacity: number;
}

export function check_color(value: string): string {
  let type = "rgb";
  let val: number[];

  if (value.indexOf("#") >= 0) {
    type = "hex";
  } else if (value.indexOf("rgb") >= 0) {
    type = "rgb";
  } else if (value.indexOf("hsl") >= 0) {
    type = "hsl";
  }

  return type;
}
