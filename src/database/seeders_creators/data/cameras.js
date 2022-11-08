import { createDevice } from '../helpers/createDevice';
import { brandsByName } from './brands';
import { typesByName } from './types';

export const cameras = [
  createDevice({
    name: 'CANON EOS Wi-Fi 4000D',
    brand: brandsByName.canon,
    type: typesByName.cameras,
    images: [
      'https://i.eldorado.ua//goods_images/1039016/6463925-1574928425.JPG',
      'https://i.eldorado.ua//goods_images/1039016/6463927-1574928433.JPG',
      'https://i.eldorado.ua//goods_images/1039016/6463935-1574928433.JPG',
    ],
  }),
  createDevice({
    name: 'CANON EOS M200',
    brand: brandsByName.canon,
    type: typesByName.cameras,
    images: [
      'https://i.eldorado.ua//goods_images/1039016/6527323-1579771657.jpg',
      'https://i.eldorado.ua//goods_images/1039016/6527317-1579771657.jpg',
      'https://i.eldorado.ua//goods_images/1039016/6527319-1579771657.jpg',
    ],
  }),
  createDevice({
    name: 'NIKON D5600',
    brand: brandsByName.canon,
    type: typesByName.cameras,
    images: [
      'https://i.eldorado.ua//goods_images/1039016/6463127-1574856606.jpg',
      'https://i.eldorado.ua//goods_images/1039016/6352807-1561104719.png',
      'https://i.eldorado.ua//goods_images/1039016/6352785-1561104719.png',
    ],
  }),
  createDevice({
    name: 'CANON EOS R6',
    brand: brandsByName.canon,
    type: typesByName.cameras,
    images: [
      'https://i.eldorado.ua//goods_images/1039016/6903533-1608808584.jpg',
      'https://i.eldorado.ua//goods_images/1039016/6903529-1608808584.jpg',
      'https://i.eldorado.ua//goods_images/1039016/6903527-1608808584.jpg',
    ],
  }),
];
