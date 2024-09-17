import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Description } from '@headlessui/react';

const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        image: '/images/94.jpg',
        price: 39.99,
        description: 'a new product for your everyday needs and i dont know what to put here',
    },
    {
        id: 2,
        name: 'Product 2',
        image: '/images/94.jpg',
        price: 19.99,
        description: 'a new product for your everyday needs and i dont know what to put here',
    },
    {
        id: 3,
        name: 'Product 3',
        image: '/images/94.jpg',
        price: 25.99,
        description: 'a new product for your everyday needs and i dont know what to put here',
    },
]

export default function ProductPage() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchedProduct = mockProducts.find(p => p.id === parseInt(productId));
        setProduct(fetchedProduct);
    }, [productId]);

    if(!product) {
        return <div className='text-center mt-10 text-gray-600'>Loading...</div>
    }

    return (
        <div className='max-w-4x1 mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg'>
            {/* Product Image */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                <div>
                    <img src={product.image} alt={product.name} className='w-full h-auto rounded-lg shadow-md object-cover'/>
                </div>
            </div>
             {/* Product Info */}
            <div className='flex flex-col justify-between'>
                <div>
                    <h1 className='text-3x1 font-bold text-gray-900 mb-4'>{product.name}</h1>
                    <p className='text-xl text-indigo-600 font-semibold mb-2'>{product.price.toFixed(2)}</p>
                    <p className=' text-gray-700 mb-6'>{product.description}</p>
                </div>

                <button className='w-full bg-indigo-600 text-white py-3 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition'>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}