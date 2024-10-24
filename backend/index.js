require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { addItemToCart, getCartItemsByUser, removeItemFromCart, updateCartQuantity} = require('./services/cartService');
const { getProducts, getIDProduct} = require('./services/productService');

const bcrypt = require('bcryptjs');
const pool = require('./db/db');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Adds items to cart
app.post('/api/cart', authenticateToken, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.userId; // Extracts User ID from the JWT session

  try {
    const cartItem = await addItemToCart(userId, productId, quantity);
    res.json(cartItem);
  } catch (error) {
    console.error('Error adding item to cart', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

// Fetches cart based on User ID
app.get('/api/cart', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Extracts User ID from the JWT session

  try{
    const cartItems = await getCartItemsByUser(userId);
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items', error);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

//fetches all products for product list
app.get('/api/products', async (req, res) => {
  const { type } = req.query;

  try {
    const products = await getProducts(type);
    res.status(200).json({success: true, products});
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
});

//fetch specific ID product for product page
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getIDProduct(id);
    if (product) {
      res.status(200).json({ success: true, product});
    } else {
      res.status(500).json({success: false, message: 'Internal server error'});
    }
  } catch (error) {
    console.error('Error in fethcing product id', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
});


//Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Checks if the user inputted email exists within the table
    const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({message: 'Email already exists'});
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Insert the new user into the database
    const newUser = await pool.query(`INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`, [username, email, hashedPassword]);

    res.status(201).json({message: 'User registered successfully', user: newUser.rows[0]} );
  } catch (error) {
    console.error('Error in registration', error);
    res.status(500).json({message: 'Server error'});
  }
}); 

//Log In
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if users exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Compare Password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if(!validPassword) {
      return res.status(400).json({message: 'Invalid email or password'});
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.rows[0].id, username: user.rows[0].username},
      process.env.JWT_SECRET,
      { expiresIn: '1h'}
    );

    // Send the token
    res.status(200).json({ message: 'Login Successful', token, username: user.rows[0].username});

  } catch (error) {
    console.error('Error in logging in', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Remove item from cart
app.delete('/api/cart/:productId', authenticateToken, async (req, res) => {
  const {productId} = req.params;
  const userId = req.user.userId;

  try {
    const removedItem = await removeItemFromCart(userId, productId);
    res.json(removedItem);
  } catch (error) {
    res.status(500).json({message: 'Error removing item from cart.'});
  }
});

// Update cart item quantity
app.put('/api/cart/:productId', authenticateToken, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.userId;

  try {
    const updatedItem = await updateCartQuantity(userId, productId, quantity);
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({message: 'Error updating cart item.'});
  }
});

// Creates an a new row for orders table
app.post('/api/orders', async (req, res) => {
  const { userId, shippingInfo, totalAmount } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders(user_id, order_total, shipping_name, shipping_address, city, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      userId,
      totalAmount,
      shippingInfo.name,
      shippingInfo.address,
      shippingInfo.city,
      shippingInfo.postalCode, 
    ]
  );

  res.status(201).json({ success: true, order: result.rows[0]});
  } catch (error) {
    console.error('Error in creating order:', error)
    res.status(500).json({ success: false, message: 'Failed to create order'});
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
