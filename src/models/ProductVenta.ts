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
  public estado!: boolean;
}

export interface ProductVentaI {
  producto_id: number;
  venta_id: number;
  cantidad: number;
  precio: number;
  total: number;
  estado?: boolean;
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
    tableName: "product_venta",
    sequelize: database,
    timestamps: true,
  }
);

ProductVenta.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });
ProductVenta.belongsTo(Venta, { foreignKey: "venta_id", as: "venta" });