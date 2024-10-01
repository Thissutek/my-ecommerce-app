import React, { useEffect, useState } from "react";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    

    if(cartItems.length === 0) {
        return <div className="text-center mt-10 text-gray-600">Your cart is empty</div>
    }

    return(
        <div className="max-w-61 mx-auto mt-10 p-6 bg-white">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            <div className="grid grid-cols-1 gap-6">
                {cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-200 py-4">
                        <div className="flex items-center">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="ml-4">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="text-lg font-semibold">${item.price.toFixed(2)}</div>
                    </div>
                ))}
            </div>  
        </div>
    )
}