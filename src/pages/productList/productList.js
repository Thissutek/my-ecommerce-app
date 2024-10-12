import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function ProductList() {
  const [products, setProducts] = useState([]); //Replace with actually product Later
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let query = '';
        if(filter) {
          query = `?type=${filter}`;
        }

        const response = await fetch(`http://localhost:5000/api/products${query}`);
        const data = await response.json();
        
        if(data.success) {
          setProducts(data.products)
        } else {
          console.error('Failed to fetch products');
        }

      } catch (error) {
        console.error('Error in fetching product', error);
      }
    };

    fetchProduct();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  return(
    <div className='max-w-6xl mx-auto mt-20 p-6 bg-white'>
      {/* Filter Dropdown */}
      <div className='mb-4'>
        <label htmlFor='filter' className='mr-2'>Filter By Type</label>
        <select id='filter' value={filter} onChange={handleFilterChange} className='p-2 border rounded'>
          <option value="">All</option>
          <option value="T">Tees</option>
          <option value="O">Outerwear</option>
        </select>
      </div>

      {/* Display Products */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className='p-4 border rounded'>
              <img 
                src={`/images/${product.image}`} 
                alt={product.name}
                className='w-full h-64 object-cover mb-4'
              />
              <h2 className='text-lg font-bold'>{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>

              <Link to={`${product.id}`}>
                <button className='mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500'>
                  View Details
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )} 

      </div>
    </div>
  );
}