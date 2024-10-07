const pool = require('../db/db');

const getProducts = async () => {
  const { rows } = await pool.query('SELECT * FROM products');
  return rows;
};

const getIDProduct = async (productId) => {
  const { rows} = await pool.query('SELECT * FROM products WHERE id = $1', [productId]);
  return rows[0];
};

module.exports = {getProducts, getIDProduct};
