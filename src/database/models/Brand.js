import { Model } from 'sequelize';

const Brand = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      Brand.hasMany(models.Device);

      Brand.belongsToMany(models.Type, { through: models.TypeBrand });
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
