import { Model } from 'sequelize';

const Brand = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.belongsToMany(models.Type, { through: models.TypeBrand });
      Brand.hasMany(models.Device, { foreignKey: 'brandId' });
    }
  }

  Brand.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Brand',
    }
  );
  return Brand;
};

export default Brand;
