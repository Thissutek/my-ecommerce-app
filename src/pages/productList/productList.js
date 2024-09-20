import React, { useState } from 'react';
import ProductCard from '../components/product-card/productCard';


const productTypes = ["Tees", "Outerwear", "Hoodies", "Accessories"];

const mockProducts = [
    {
        id: 1,
        name: 'Product 1',
        image: '/images/94.jpg',
        price: 39.99,
        type: "Outerwear",
    },
    {
        id: 2,
        name: 'Product 2',
        image: '/images/94.jpg',
        price: 19.99,
        type: "Hoodies",
    },
    {
        id: 3,
        name: 'Product 3',
        image: '/images/94.jpg',
        price: 25.99,
        type: "Tees",
    },
    {
        id: 4,
        name: 'Product 4',
        image: '/images/94.jpg',
        price: 25.99,
        type: "Accessories",
    },
]

export default function ProductList() {
    const [products] = useState(mockProducts); //Replace with actually product Later
    const [selectedTypes, setSelectTypes] = useState([]);

    const handleFilterChange = (type) => {
        if(selectedTypes.includes(type)) {
            setSelectTypes(selectedTypes.filter(t => t !== type)); //Removes the select products by filter
        } else {
            setSelectTypes([...selectedTypes, type])   // Add to Selected
        }
    }

    const filteredProducts = selectedTypes.length > 0
        ? products.filter(product => selectedTypes.includes(product.type))
        : products;

    return(
        <div>
            <div className='filter-bar p-4'>
                <h3 className='text-lg font-semibold'>Product Type</h3>
                <div className='space-x-4 mt-2'>
                    {productTypes.map((type) => (
                        <label key={type} className='inline-flex items-center'>
                            <input 
                                type='checkbox'
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleFilterChange(type)}
                                className='form-checkbox h-5 w-5'  
                            />
                            <span className='ml-2'>{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}