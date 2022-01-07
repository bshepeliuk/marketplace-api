import BrandService from '../../src/services/BrandService';
import DeviceService from '../../src/services/DeviceService';
import TypeService from '../../src/services/TypeService';

export const createDevice = async () => {
  const type = await TypeService.create({ name: 'laptops' });
  const brand = await BrandService.create({ name: 'ASUS' });
  const device = await DeviceService.create({
    name: 'ASUS Zenbook 15',
    price: 30000,
    brandId: brand.id,
    typeId: type.id,
    quantity: 5,
  });

  return device;
};
