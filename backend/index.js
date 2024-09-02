require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//PostgreSQL client Setup
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  app.get('/', (req, res) => {
    res.send('E-commerce API');
  });
  

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})