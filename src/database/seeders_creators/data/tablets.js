import { createDevice } from '../helpers/createDevice';
import { brandsByName } from './brands';
import { typesByName } from './types';

export const tablets = [
  createDevice({
    name: 'Xiaomi Pad 5 10.9” 6/128GB Cosmic Gray (VHU4088)',
    type: typesByName.tablets,
    brand: brandsByName.xiaomi,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/7/8/78867868678.jpg',
    ],
  }),
  createDevice({
    name: 'Samsung Galaxy Tab A7 Lite',
    type: typesByName.tablets,
    brand: brandsByName.samsung,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/7/5/75675675_1.jpg',
    ],
  }),
  createDevice({
    name: 'Lenovo Tab P11 4/128 LTE',
    type: typesByName.tablets,
    brand: brandsByName.lenovo,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/n/x/nxn_result_2.jpg',
    ],
  }),
  createDevice({
    name: 'Huawei MatePad 11',
    type: typesByName.tablets,
    brand: brandsByName.huawei,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/7/8/78_4000_1_1.jpg',
    ],
  }),
  createDevice({
    name: 'Samsung Tab S6 Lite',
    type: typesByName.tablets,
    brand: brandsByName.samsung,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/f/i/file_1711_7.jpg',
    ],
  }),
  createDevice({
    name: 'Apple iPad Pro',
    type: typesByName.tablets,
    brand: brandsByName.apple,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/w/w/wwru_ipad-pro-129-cellular-spacegray_q321_pdp-image-1b_result_1_1_1_1_1.jpg',
    ],
  }),
  createDevice({
    name: 'Microsoft Surface Pro X',
    type: typesByName.tablets,
    brand: brandsByName.microsoft,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/c/l/clbynxu6.jpg',
    ],
  }),
];
