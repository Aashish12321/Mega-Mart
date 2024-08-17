import React from 'react';

const OrderDetails = ({ order }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p><strong>Order Number:</strong> {order?._id}</p>
        <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p><strong>Shipping Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
        <p><strong>Payment Method:</strong> {order.payment.method}</p>
        <p><strong>Payment Status:</strong> {order.payment.isPaid ? 'Paid' : 'Pending'}</p>
      </div>
    
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Items</h2>
        <ul>
          {order.orderItems.map(item => (
            <li key={item.product} className="flex flex-col sm:flex-row items-center mb-4 border-b pb-4">
              <img src={item.image} alt={item.name} className="w-full sm:w-20 h-20 object-cover mb-4 sm:mb-0 sm:mr-4"/>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                <p><strong>Subtotal:</strong> ${(item.quantity * item.price).toFixed(2)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Total Price</h2>
        <p className="text-xl font-bold">${order.totalPrice.toFixed(2)}</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Status</h2>
        <p><strong>Status:</strong> {order.status}</p>
        {order.isDelivered && (
          <p><strong>Delivered At:</strong> {new Date(order.deliveredAt).toLocaleDateString()}</p>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
        <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Contact Support</button>
        <button className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400">Return Policy</button>
      </div>
    </div>
  );
};

export default OrderDetails;
