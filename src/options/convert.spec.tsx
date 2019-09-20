import Convert from "./convert";

describe("Тестирование Конвертации цвета", () => {
  it("rgb => hex", () => {
    expect(Convert.rgb_hex([77, 92, 66])).toEqual("#4d5c42");
  });

  it("hex => rgb", () => {
    expect(Convert.hex_rgb("#7bab65")).toEqual([123, 171, 101]);
  });

  it("rgb => hsv", () => {
    expect(Convert.rgb_hsv([77, 92, 66])).toEqual([95, 28, 36]);
  });
  it("hsv => rgb", () => {
    expect(Convert.hsv_rgb(95, 69, 75)).toEqual([114, 191, 59]);
  });

  it("hsl => hsv", () => {
    expect(Convert.hsl_hsv([0, 25, 29])).toEqual([0, 40, 36]);
  });
  it("hsv => hsl", () => {
    expect(Convert.hsv_hsl([0, 40, 36])).toEqual([0, 25, 28]);
  });

  it("rgb => hsl", () => {
    expect(Convert.rgb_hsl([48, 40, 40])).toEqual([0, 9, 17]);
  });
  it("hsl => rgb", () => {
    expect(Convert.hsl_rgb([0, 34, 19])).toEqual([65, 32, 32]);
  });
});
