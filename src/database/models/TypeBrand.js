import { Model } from 'sequelize';

const TypeBrand = (sequelize, DataTypes) => {
  class TypeBrand extends Model {
    static associate(models) {}
  }

  TypeBrand.init(
    {
      typeId: DataTypes.INTEGER,
      brandId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'TypeBrand',
    }
  );
  return TypeBrand;
};

export default TypeBrand;
