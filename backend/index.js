require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { addItemToCart, getCartItems } = require('./services/cartService')
const { getProducts, getIDProduct } = require('./services/productService')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('E-commerce API');
});
  
app.post('/api/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const item = await addItemToCart(userId, productId, quantity);
    res.status(201).json({success: true, item})
  } catch (error) {
    console.error('Error in adding to cart', error);
    res.status(500).json({success: false, message: 'Interal Server Error'})
  }
})

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

//fetches all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.status(200).json({success: true, products})
  } catch (error) {
    console.error('Error fetching products', error);
    res.status(500).json({success: false, message: 'Internal server error'});
  }
})

//fetch specific ID product 
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})
