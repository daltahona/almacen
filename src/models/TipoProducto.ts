import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class TipoProducto extends Model {
  public nombre!: string;
  public estado!: boolean;
}

export interface TipoProductoI {
  nombre: string;
  estado?: boolean;
}

TipoProducto.init(
  {

    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto no está oculto
  },
    
  },
  {
    tableName: "tipoProductos",
    sequelize: database,
    timestamps: true
  }
);