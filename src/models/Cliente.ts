import { Model, DataTypes } from "sequelize";
import { database } from "../database/db";

export class Cliente extends Model {
  public nombre!: string;
  public direccion!: string;
  public telefono!: string;
  public correo!: string;
  public password!: string;
  public estado!: boolean;

}

export interface ClienteI {
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    password: string;
    estado?: boolean;
}

Cliente.init(
  {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
      },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
      },
    password: {
        type: DataTypes.STRING,
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
    tableName: "clientes",
    sequelize: database,
    timestamps: true,
  }
);

