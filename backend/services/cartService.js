const pool = require('../index.js');

//Add item to cart
async function addItemToCart(userId, productId, quantity) {
  const query = `INSERT INTO cart (user_id, product_id, quantity, added_at) VALUES ($1, $2, $3, NOW()) RETURNING *;`;
  const values = [userId, productId, quantity];
  const result = await pool.query(query, values);
  return result.rows[0];
}

//Get items from cart
async function getCartItems(userId) {
  const query = `SELECT * FROM cart where user_id = $1;`;
  const values = [userId];
  const result = await pool.query(query, values);
  return result.rows;
}

module.exports = { addItemToCart, getCartItems };