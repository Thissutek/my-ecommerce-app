const pool = require('../db/db');

//Add item to cart
async function addItemToCart(userId, productId, quantity) {
  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id) DO UPDATE
    SET quantity = cart.quantity + $3
    RETURNING *;
    `;
  const result = await pool.query(query, [userId, productId, quantity]);
  return result.rows[0];
}

//Get items from cart
async function getCartItemsByUser(userId) {
  const query = `
    SELECT 
      cart.product_id, 
      cart.quantity, 
      products.name, 
      products.price, 
      products.image AS image_url
    FROM cart 
    JOIN products ON cart.product_id = products.id 
    WHERE cart.user_id = $1;`;
  const result = await pool.query(query, [userId]);
  console.log(result.rows)
  return result.rows;
}

module.exports = { addItemToCart, getCartItemsByUser };