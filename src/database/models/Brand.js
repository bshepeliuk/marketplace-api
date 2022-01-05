import { Model } from 'sequelize';

const Brand = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Device, { foreignKey: 'brandId' });

      Brand.belongsToMany(models.Type, {
        through: models.TypeBrand,
        foreignKey: 'typeId',
        as: 'types',
      });
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
