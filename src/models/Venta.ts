import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";
import { Cliente } from "./Cliente";

export class Venta extends Model {
  public fechaVenta!: string;
  public subtotal!: number;
  public impuestos!: number;
  public descuentos!: number;
  public total!: number;
  public clientes_id!: number;
  public estado!: boolean;
}

export interface VentaI {
  fechaVenta: string;
  subtotal: number;
  impuestos: number;
  descuentos: number;
  total: number;
  clientes_id: number;
  estado: boolean;
}

Venta.init(
  {
    fechaVenta: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    impuestos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    descuentos: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    clientes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id',
      },
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    tableName: "ventas",
    sequelize: database,
    timestamps: true,
  }
);

Venta.belongsTo(Cliente, { foreignKey: "clientes_id", as: "cliente" });