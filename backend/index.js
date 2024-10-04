require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { addItemToCart, getCartItems } = require('./services/cartService');
const { getProducts, getIDProduct } = require('./services/productService');

const bcrypt = require('bcryptjs');
const pool = require('./db/db');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Adds items to cart
app.post('/api/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  
  try{
    const cartItem = await addItemToCart(userId, productId, quantity);
    res.json({message: 'Item added to cart', cartItem})
  } catch (error) {
    console.error('Error adding cart item', error);
    res.status(500).json({message: 'Error adding item to cart'})
  }
})

// Fetches cart based on User ID
app.get('/api/cart/:userId', async (req, res) => {
  const userId = req.params.userId

  try {
    const items = await getCartItems(userId)
    res.status(200).json({success: true, items})
  } catch (error) {
    console.error('Error retrieving cart items', error)
    res.status(500).json({success: false, message: 'Internal Server Error'})
  }
})

//fetches all products for product list
app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({success: true, products})
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
})

//fetch specific ID product for product page
app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getIDProduct(id)
    if (product) {
      res.status(200).json({ success: true, product})
    } else {
      res.status(500).json({success: false, message: 'Internal server error'})
    }
  } catch (error) {
    console.error('Error in fethcing product id', error)
    res.status(500).json({success: false, message: 'Internal server error'})
  }
})


//Sign Up Route
app.post('/api/auth/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //Checks if the user inputted email exists within the table
    const userCheck = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({message: 'Email already exists'})
    }

    //Hash the Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Insert the new user into the database
    const newUser = await pool.query(`INSERT INTO users (username, email, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *`, [username, email, hashedPassword]);

    res.status(201).json({message: 'User registered successfully', user: newUser.rows[0]} )
  } catch (error) {
    console.error('Error in registration', error);
    res.status(500).json({message: 'Server error'})
  }
}) 

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
    res.status(200).json({ message: 'Login Successful', token, username: user.rows[0].username})

  } catch (error) {
    console.error('Error in logging in', error);
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
