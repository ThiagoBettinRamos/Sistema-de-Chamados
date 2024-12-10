import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class StatusChamado extends Model {
  public id!: number;
  public descricao!: string;
}

StatusChamado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StatusChamado",
    tableName: "status_chamados",
  }
);

export default StatusChamado;
