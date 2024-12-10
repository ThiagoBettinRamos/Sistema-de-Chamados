import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Usuario extends Model {
  public id!: number;
  public nome!: string;
  public email!: string;
  public senha!: string;
  public isAdmin!: boolean;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Usuario",
    tableName: "usuarios",
  }
);

export default Usuario;
