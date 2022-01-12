import { Model } from 'sequelize';

const Type = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Device, { foreignKey: 'typeId' });

      Type.belongsToMany(models.Brand, {
        through: models.TypeBrand,
        foreignKey: 'brandId',
        as: 'brands',
      });
    }
  }

  Type.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Type',
    }
  );
  return Type;
};

export default Type;
