import React, { useState } from 'react';
import ProductCard from '../product-card/productCard';

const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        image: '/images/94.jpg',
        price: 39.99,
    },
    {
        id: 2,
        name: 'Product 2',
        image: '/images/94.jpg',
        price: 19.99,
    },
    {
        id: 3,
        name: 'Product 3',
        image: '/images/94.jpg',
        price: 25.99,
    },
]

export default function ProductList() {
    const [products] = useState(mockProducts); //Replace with actually product Later

    return( 
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}