import {
  attachBrandIdAndGetDevices,
  attachImgUrlAndGetDeviceImgData,
  attachImgUrlToProperDeviceName,
  attachTypeIdAndGetDevices,
  generateBrandsDataByNames,
  generateDeviceDetails,
  generateDevicesWithFullInfo,
  generateTypesDataByNames,
  getAllDevicesByTypeId,
  matchNameToId,
} from './helpers';
import {
  laptops,
  laptopsCPU,
  laptopsGraphics,
  laptopsImages,
  laptopsMatrixTypes,
  laptopsRAM,
  laptopsScreenResolution,
  laptopsScreenSize,
  namesOfBrands,
  namesOfTypes,
  phones,
  phonesImages,
  tablets,
  tabletsImages,
} from './data';

const deviceBrands = generateBrandsDataByNames(namesOfBrands);
const deviceTypes = generateTypesDataByNames(namesOfTypes);

const brandIdByName = matchNameToId(deviceBrands);
const typeIdByName = matchNameToId(deviceTypes);

const devicesWithTypeIds = [
  ...attachTypeIdAndGetDevices({
    items: laptops,
    typeId: typeIdByName.laptops,
  }),
  ...attachTypeIdAndGetDevices({ items: phones, typeId: typeIdByName.phones }),
  ...attachTypeIdAndGetDevices({
    items: tablets,
    typeId: typeIdByName.tablets,
  }),
];

const deviceImagesWithNames = [
  ...attachImgUrlToProperDeviceName({ items: laptops, images: laptopsImages }),
  ...attachImgUrlToProperDeviceName({ items: phones, images: phonesImages }),
  ...attachImgUrlToProperDeviceName({ items: tablets, images: tabletsImages }),
];

const devicesWithBrandIds = attachBrandIdAndGetDevices({
  items: devicesWithTypeIds,
  brands: deviceBrands,
});

const testDevices = Array(60)
  .fill(undefined)
  .map((_, idx) => ({
    name: `Test example № - ${idx}`,
    typeId: typeIdByName['test-type'],
    brandId: brandIdByName['TEST-BRAND'],
  }));

const devices = generateDevicesWithFullInfo([
  ...devicesWithBrandIds,
  ...testDevices,
]);

const deviceImages = attachImgUrlAndGetDeviceImgData(
  devices,
  deviceImagesWithNames
);
// TODO: separate it
const laptopIds = getAllDevicesByTypeId({
  devices,
  typeId: typeIdByName.laptops,
}).map((item) => item.id);

const deviceDetails = generateDeviceDetails(laptopIds, [
  ['Microprocessor', laptopsCPU],
  ['Video graphics', laptopsGraphics],
  ['Screen resolution', laptopsScreenResolution],
  ['Screen size', laptopsScreenSize],
  ['Type of matrix', laptopsMatrixTypes],
  ['RAM', laptopsRAM],
]);

export { devices, deviceImages, deviceBrands, deviceTypes, deviceDetails };
