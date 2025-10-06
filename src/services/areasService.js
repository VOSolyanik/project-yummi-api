import { Area } from '../db/models/index.js';

export const listOfAreas = async () => {
  return await Area.findAll({
    order: [['name', 'ASC']],
  });
};
