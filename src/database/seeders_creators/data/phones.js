import { createDevice } from '../helpers/createDevice';
import { brandsByName } from './brands';
import { typesByName } from './types';

export const phones = [
  createDevice({
    name: 'Xiaomi 11T',
    type: typesByName.phones,
    brand: brandsByName.xiaomi,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/1/1/11_451_5_1.jpg',
    ],
  }),
  createDevice({
    name: 'Samsung Galaxy S21 FE',
    type: typesByName.phones,
    brand: brandsByName.samsung,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/6/7/6786786786788867_1.jpg',
    ],
  }),
  createDevice({
    name: 'Xiaomi Redmi Note 10S',
    type: typesByName.phones,
    brand: brandsByName.xiaomi,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/x/i/xiaomi_redmi_note_10s_ocean_blue_1.jpg',
    ],
  }),
  createDevice({
    name: 'Apple iPhone 11',
    type: typesByName.phones,
    brand: brandsByName.apple,
    images: [
      'https://i.allo.ua/media/catalog/product/cache/1/image/620x600/602f0fa2c1f0d1ba5e241f914e856ff9/8/c/8c901999dacf4c04a72a403f6ad01e14__2.jpg',
    ],
  }),
  createDevice({
    name: 'SAMSUNG Galaxy S22 Ultra 8',
    brand: brandsByName.samsung,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua//goods_images/1038946/7682699-1644327438.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7682701-1644327438.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7682677-1644327438.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7682671-1644327438.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7849619-1653913159.jpg',
    ],
  }),
  createDevice({
    name: 'APPLE iPhone 11 Black',
    brand: brandsByName.apple,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua//goods_images/1038946/6409123-1568884807.jpg',
      'https://i.eldorado.ua//goods_images/1038946/6409125-1568884808.jpg',
      'https://i.eldorado.ua//goods_images/1038946/6464891-1574953478.png',
      'https://i.eldorado.ua//goods_images/1038946/6859863-1606378650.jpg',
      'https://i.eldorado.ua//goods_images/1038946/6409117-1568884807.jpg',
    ],
  }),
  createDevice({
    name: 'SAMSUNG Galaxy A03',
    brand: brandsByName.samsung,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua//goods_images/1038946/7914032-1658397801.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7914026-1658397801.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7914030-1658397801.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7914034-1658397801.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7914033-1658397801.jpg',
    ],
  }),
  createDevice({
    name: 'APPLE iPhone 13 Pro Max',
    brand: brandsByName.apple,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua///goods_images/1719458/8da266a8a57f74988bc0f36ce8e8bfb7.jpg',
      'https://i.eldorado.ua///goods_images/1719458/54fdbe7f3214295b362de89c581ebf47.jpg',
      'https://i.eldorado.ua///goods_images/1719458/916a3e80ff77c9ebf1a6fabf1935b2e7.jpg',
      'https://i.eldorado.ua///goods_images/1719458/80cd636ef83e433f5b4b8fcb6314fe48.jpg',
    ],
  }),
  createDevice({
    name: 'SAMSUNG Galaxy M53',
    brand: brandsByName.samsung,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua//goods_images/1038946/7832296-1652109189.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7832290-1652109189.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7832295-1652109189.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7832289-1652109189.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7832294-1652109189.jpg',
    ],
  }),
  createDevice({
    name: 'XIAOMI Redmi 9C',
    brand: brandsByName.xiaomi,
    type: typesByName.phones,
    images: [
      'https://i.eldorado.ua//goods_images/1038946/7925702-1658916946.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7925703-1658916946.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7925708-1658916946.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7925707-1658916946.jpg',
      'https://i.eldorado.ua//goods_images/1038946/7925704-1658916946.jpg',
    ],
  }),
];
