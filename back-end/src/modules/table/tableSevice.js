import { query } from '../../db.js';

export const getData = async () => {
  try {
    const results = await query('SELECT * FROM bmirecords ');
    return results;
  } catch (err) {
    throw err;
  }
};
