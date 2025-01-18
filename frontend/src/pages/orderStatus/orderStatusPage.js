import React, { useEffect, useState } from 'react';


export default function OrderStatus({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${process.env.REACT_API_URL}/api/orders/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if(response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch(error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p>Loading Orders...</p>;
  return (
    <div className='max-w-4xl mx-auto mt-10 p-6 bg-white'>
      <h1 className='text-3xl font-bold mb-6'>Order Status</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.orderId} className="mb-8 border-b pb-4">
            <h2 className="text-xl font-semibold">Order ID: {order.orderId}</h2>
            <p>Status: {order.orderStatus}</p>
            <p>Order Total: ${order.orderTotal}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <div>
              <h3 className="font-semibold mt-2">Shipping Info:</h3>
              <p>{order.shippingInfo.name}</p>
              <p>{order.shippingInfo.address}, {order.shippingInfo.city}</p>
              <p>Postal Code: {order.shippingInfo.postalCode}</p>
            </div>
            <div>
              <h3 className="font-semibold mt-2">Items:</h3>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    Product ID: {item.productId} - Quantity: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}

