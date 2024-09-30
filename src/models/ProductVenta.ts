import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

export class ProductVenta extends Model {
  public producto_id!: number;
  public venta_id!: number;
  public cantidad!: number;
  public precio!: number;
  public total!: number;
}

export interface ProductVentaI {
  producto_id: number;
  venta_id: number;
  cantidad: number;
  precio: number;
  total: number;
}

ProductVenta.init(
  {
    producto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Producto,
        key: 'id',
      },
    },
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Venta,
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "product_venta",
    sequelize: database,
    timestamps: true,
  }
);

ProductVenta.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });
ProductVenta.belongsTo(Venta, { foreignKey: "venta_id", as: "venta" });