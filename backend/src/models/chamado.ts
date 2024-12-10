import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Usuario from "./usuario";
import StatusChamado from "./statusChamado";

class Chamado extends Model {
  public id!: number;
  public descricao!: string;
  public dataHora!: Date;
  public usuario_id!: number;
  public status_id!: number;
}

Chamado.init(
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
    dataHora: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Chamado",
    tableName: "chamados",
  }
);

Usuario.hasMany(Chamado, { foreignKey: "usuario_id" });
Chamado.belongsTo(Usuario, { foreignKey: "usuario_id" });

StatusChamado.hasMany(Chamado, { foreignKey: "status_id" });
Chamado.belongsTo(StatusChamado, { foreignKey: "status_id" });

export default Chamado;
