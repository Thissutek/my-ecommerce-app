import React from 'react';
import { useLocation } from 'react-router-dom';


export default function OrderConfirmation() {
  const location = useLocation();
  const { cartItems, totalAmount, shippingInfo } = location.state || {};

  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white'>
      <h1 className='text-3xl font-bold mb-6'>Order Confirmation</h1>

      <h2 className='text-xl font-semibold mb-4'>Shipping Information</h2>
      <p>Name: {shippingInfo.name}</p>
      <p>Address: {shippingInfo.address}</p>
      <p>City: {shippingInfo.city}</p>
      <p>Postal Code: {shippingInfo.postalCode}</p>

      <h2 className='text-xl font-semibold mt-6 mb-4'>Your Items:</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} (x{item.quantity}) - ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h2 className='text-xl font-semibold mt-6'> Total: ${totalAmount}</h2>
    </div>
  );
}