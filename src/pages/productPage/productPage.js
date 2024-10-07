import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductPage({userId}) {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error('Error in fetching product', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const addToCart = async (userId, productId, quantity) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity})
      });
      
      if(response.ok) {
        console.log('Item added to cart.')
      }

    } catch (error) {
      console.error('Error in adding item to cart', error);
    }
  };

  if(!product) {
    return <div className='text-center mt-10 text-gray-600'>Loading...</div>;
  }

  const handleAddToCart = () => {
    if(product) {
      addToCart(userId, productId, quantity);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-40 p-6 bg-white">
      {/* Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="w-full max-w-2x1 h-auto rounded-lg shadow-md object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-xl text-indigo-600 font-semibold mb-2">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <button 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition"
            onClick={handleAddToCart}
          >
                Add to Cart
          </button>
        </div>
      </div>
    </div>

  );
}