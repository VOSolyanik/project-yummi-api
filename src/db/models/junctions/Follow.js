import { DataTypes } from 'sequelize';
import sequelize from '../../connection.js';

const Follow = sequelize.define(
  'Follow',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  },
  { tableName: 'follows', timestamps: false }
);

export default Follow;
