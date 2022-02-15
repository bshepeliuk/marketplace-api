import {
  attachBrandIdAndGetDevices,
  attachImgUrlAndGetDeviceImgData,
  attachImgUrlToProperDeviceName,
  attachTypeIdAndGetDevices,
  generateBrandsDataByNames,
  generateDevicesWithFullInfo,
  generateTestDevicesFromLastId,
  generateTypesDataByNames,
} from './helpers';
import {
  laptops,
  laptopsImages,
  namesOfBrands,
  namesOfTypes,
  phones,
  phonesImages,
  tablets,
  tabletsImages,
} from './data';

const deviceBrands = generateBrandsDataByNames(namesOfBrands);
const deviceTypes = generateTypesDataByNames(namesOfTypes);

const devicesWithTypeIds = [
  ...attachTypeIdAndGetDevices({ items: laptops, typeId: 1 }),
  ...attachTypeIdAndGetDevices({ items: phones, typeId: 3 }),
  ...attachTypeIdAndGetDevices({ items: tablets, typeId: 2 }),
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

const devices = generateDevicesWithFullInfo(devicesWithBrandIds);

// TODO: only for testing, will remove it later
const testDevices = generateTestDevicesFromLastId(
  devices[devices.length - 1].id
);

const deviceImages = attachImgUrlAndGetDeviceImgData(
  devices,
  deviceImagesWithNames
);

export { devices, deviceImages, deviceBrands, deviceTypes, testDevices };
