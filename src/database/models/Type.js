import { Model } from 'sequelize';

const Type = (sequelize, DataTypes) => {
  class Type extends Model {
    static associate(models) {
      Type.belongsToMany(models.Brand, { through: models.TypeBrand });
      Type.hasMany(models.Device, { foreignKey: 'typeId' });
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
