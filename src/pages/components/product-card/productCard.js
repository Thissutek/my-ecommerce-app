import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({product}) {
    return(
        <div className='product-card border p-4 rounded-lg shadow-lg'>
            <img src={product.image} alt={product.name} className='w-full h-48 object-cover'/>

            <div className='mt-4'>
                <h3 className='text-xl font-bold'>{product.name}</h3>
                <p className='text-gray-500 mt-2'>${product.price}</p>

                <Link to={`/products/${product.id}`} className='mt-4 inline-block text-indigo-600 hover:text-indigo-900'>
                View Details
                </Link>
            </div>
        </div>
    )
}