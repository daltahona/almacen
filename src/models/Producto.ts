import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { TipoProducto } from "./TipoProducto";

export class Producto extends Model {
  public nombre!: string;
  public marca!: string;
  public precio!: number;
  public stockMin!: number;
  public cantidad!: number;
  public TipoProducto_id!: number;
}

export interface ProductoI {
  nombre: string;
  marca: string;
  precio: number;
  stockMin: number;
  cantidad: number;
  TipoProducto_id: number;
}

Producto.init(
  {
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockMin: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TipoProducto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: TipoProducto,
        key: 'id',
      },
    },
  },
  {
    tableName: "productos",
    sequelize: database,
    timestamps: true,
  }
);

Producto.belongsTo(TipoProducto, { foreignKey: "TipoProducto_id", as: "tipoProducto" });