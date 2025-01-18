import React, { useEffect, useState } from "react";
import { checkTokenExpiry } from "../utils/authUtils";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch the cart items when the component mounts
  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      setError(null);
      setLoading(true);

      if(!checkTokenExpiry()) {
        alert("Session expired, please log in again.");
        window.location.href = '/login';
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_API_URL}/api/cart`, {
          headers: {
            'Authorization' : `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          alert("Session expired, please log in again.");
          window.location.href = '/login';
          return;
        }

        if(response.ok) {
          const data = await response.json();
          setCartItems(data);
        } else {
          throw new Error('Failed to fetch cart items');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (productId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if(response.ok) {
        setCartItems(cartItems.filter(item => item.product_id !== productId));
      } else {
        throw new Error('Failed to remove item');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity})
      });

      if(response.ok) {
        const updatedItem = await response.json();
        setCartItems(cartItems.map(item => item.product_id === productId ? {...item, quantity: updatedItem.quantity} : item
        ));
      } else {
        throw new Error ('Failed to update quantity.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduceRight((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    const total = calculateTotalPrice().toFixed(2);
    navigate(`/checkout`, { state: {cartItems, total } });
  };

  if(loading) return <p>Loading ...</p>;
  if(error) return <p>Error: {error}</p>;

  return(
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"> 
          {cartItems.map((item) => (
            <div key={item.product_id} className="border p-4 round-lg shadow-sm">
              <img src={`/images/${item.image_url}`} alt={item.name} className="h-32 w-auto object-cover mb-4"/>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-4 space-x-4">
                <span> Quantity: {item.quantity}</span>
                <button 
                  className="px-3 py-1 bg-gray-200 rounded-md" 
                  onClick={() => handleUpdateQuantity(item.product_id, item.quantity - 1)}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <button 
                  className="px-3 py-1 bg-gray-200 rounded-md" 
                  onClick={() => handleUpdateQuantity(item.product_id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="mt-4 text-red-600"
                onClick={() => handleRemoveItem(item.product_id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Total: ${calculateTotalPrice().toFixed(2)}</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-md" onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>

    </div>
  );
}