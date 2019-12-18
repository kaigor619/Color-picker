import Convert from './convert';
import Model from './modelsColor';

describe('Тестирование Конвертации цвета', () => {
  // HSV
  describe('HSV', () => {
    it('rgb => hsv', () => {
      expect(Convert.rgb_hsv([245, 183, 12])).toEqual([44, 95, 96]);
    });
    it('hsv => rgb', () => {
      expect(Convert.hsv_rgb(44, 95, 96)).toEqual([244, 182, 12]);
    });
  });

  // Hex
  describe('HEX', () => {
    it('rgb => hex', () => {
      expect(Model.hex.rgb_hex([77, 92, 66], 1)).toEqual('#4d5c42');
    });
    it('Преобразование в нормальный вид', () => {
      expect(Model.hex.getWorkView('#ad1818cc')).toEqual({
        val: '#ad1818cc',
        opacity: 0.8,
      });
    });
    it('get Opacity hex', () => {
      expect(Model.hex.getOpacity(0.8)).toEqual('cc');
    });

    it('hex => rgb', () => {
      expect(Model.hex.hex_rgb('#7bab65')).toEqual([123, 171, 101]);
    });
  });

  describe('RGB', () => {
    it('get String', () => {
      expect(Model.rgb.getString([77, 92, 66], 0.7)).toEqual(
        'rgba(77, 92, 66, 0.7)',
      );
    });
    it('Преобразование в нормальный вид', () => {
      expect(Model.rgb.getWorkView('rgba(77, 92, 66, 0.7)')).toEqual({
        val: [77, 92, 66],
        opacity: 0.7,
      });
    });
  });

  describe('HSL', () => {
    it('rgb => hsl', () => {
      expect(Model.hsl.rgb_hsl([48, 40, 40], 1)).toEqual([0, 9, 17]);
    });
    it('hsl => rgb', () => {
      expect(Model.hsl.hsl_rgb([0, 34, 19])).toEqual([65, 32, 32]);
    });
    it('get String', () => {
      expect(Model.hsl.getString([77, 92, 66], 0.7)).toEqual(
        'hsla(77, 92%, 66%, 0.7)',
      );
    });
    it('Преобразование в нормальный вид', () => {
      expect(Model.hsl.getWorkView('hsla(77, 92%, 66%, 0.7)')).toEqual({
        val: [77, 92, 66],
        opacity: 0.7,
      });
    });
  });
});
