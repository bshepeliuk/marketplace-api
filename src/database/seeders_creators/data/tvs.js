import { createDevice } from '../helpers/createDevice';
import { brandsByName } from './brands';
import { typesByName } from './types';

export const tvs = [
  createDevice({
    name: 'SAMSUNG UE43AU9000UXUA',
    brand: brandsByName.samsung,
    type: typesByName.tvs,
    images: [
      'https://i.eldorado.ua//goods_images/1038962/7068011-1617082699.jpg',
      'https://i.eldorado.ua//goods_images/1038962/7068025-1617082721.jpg',
      'https://i.eldorado.ua//goods_images/1038962/7068021-1617082700.jpg',
      'https://i.eldorado.ua//goods_images/1038962/7068015-1617082700.jpg',
    ],
  }),
  createDevice({
    name: 'SAMSUNG QE55Q80AAUXUA',
    brand: brandsByName.samsung,
    type: typesByName.tvs,
    images: [
      'https://i.eldorado.ua//goods_images/1038962/7068709-1617090542.jpg',
      'https://i.eldorado.ua/goods_images/1038962/7068713-1617090549.jpg',
    ],
  }),
  createDevice({
    name: 'Xiaomi Mi TV P1',
    brand: brandsByName.xiaomi,
    type: typesByName.tvs,
    images: [
      'https://i.eldorado.ua//goods_images/1038962/7540607-1638365744.jpg',
      'https://i.eldorado.ua//goods_images/1038962/7540605-1638365744.jpg',
      'https://i.eldorado.ua//goods_images/1038962/7540603-1638365744.jpg',
    ],
  }),
];
