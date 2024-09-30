import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoProducto extends Model {
  public nombre!: string;
}

export interface TipoProductoI {
  nombre: string;
}

TipoProducto.init(
  {

    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    tableName: "tipoProductos",
    sequelize: database,
    timestamps: true
  }
);