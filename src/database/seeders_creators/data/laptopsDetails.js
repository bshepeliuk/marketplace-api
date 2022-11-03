const laptopsScreenSize = ['15.6', '13', '14', '17'];

const laptopsCPU = [
  'Intel Core i7',
  'Intel Core i5',
  'Intel Core i3',
  'Intel Xeon',
  'AMD Ryzen 9',
  'AMD Ryzen 5',
  'AMD Ryzen 7',
  'AMD Ryzen 3',
];

const laptopsRAM = [4, 8, 16, 32, 64];

const laptopsGraphics = [
  'NVIDIA GeForce GTX 1070',
  'AMD Radeon R7',
  'NVIDIA GeForce RTX 3080',
  'AMD Radeon RX Vega 3',
  'NVIDIA GeForce RTX 3070',
  'NVIDIA GeForce RTX 2060',
  'NVIDIA GeForce RTX 3050',
  'Intel Iris Xe Max',
  'Intel Iris Xe Graphics G7',
  'Intel Iris Plus Graphics G4',
  'AMD Radeon Vega 9',
  'AMD Radeon RX Vega 5',
  'AMD Radeon R6',
  'Intel UHD Graphics',
  'AMD Radeon R4',
];

const laptopsMatrixTypes = ['IPS', 'OLED', 'TN+Film', 'TN', 'Retina'];

const laptopsScreenResolution = [
  '1366 x 768',
  '1600 x 900',
  '1920 x 1080',
  '2560 x 1440',
  '2560 x 1440',
  '3200 x 1800',
  '3840 x 2160',
];

export const laptopDetails = [
  ['Microprocessor', laptopsCPU],
  ['Video graphics', laptopsGraphics],
  ['Screen resolution', laptopsScreenResolution],
  ['Screen size', laptopsScreenSize],
  ['Type of matrix', laptopsMatrixTypes],
  ['RAM', laptopsRAM],
];
