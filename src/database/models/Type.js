import { Model } from 'sequelize';

const Type = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.hasMany(models.Device);

      Type.belongsToMany(models.Brand, { through: models.TypeBrand });
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
