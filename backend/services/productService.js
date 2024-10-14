const pool = require('../db/db');

const getProducts = async (type) => {
  let query = 'SELECT * FROM products';
  const queryParams = [];

  if (type) {
    query += ' WHERE type = $1';
    queryParams.push(type);
  }

  try {
    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products from database', error);
    throw error;
  }
};

const getIDProduct = async (productId) => {
  const { rows } = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
  return rows[0];
};


module.exports = {getProducts, getIDProduct};
