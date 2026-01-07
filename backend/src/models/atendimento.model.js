import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Atendimento = sequelize.define(
  'Atendimento',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    referencia: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numeroAtendimento: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
    },
    tipoAtendimento: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    motivoReconversao: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    sistema: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tecnicoResponsavel: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dataColeta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dataConclusao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    quantidadeDias: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    conferenciaPor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: 'atendimentos',
    timestamps: true,
  }
);

export default Atendimento;
