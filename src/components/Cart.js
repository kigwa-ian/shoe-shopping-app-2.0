import React, { useState } from 'react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map(item => (
          <div key={item.id} className="p-4 border mb-2">
            <h3>{item.name}</h3>
            <p>{formatCurrency(item.price)}</p>
            <button 
              onClick={() => removeItem(item.id)} 
              className="bg-red-500 text-white p-2 mt-2"
            >
              Remove
            </button>
          </div>
        ))
      )}
      {cartItems.length > 0 && (
        <button className="bg-green-500 text-white p-2 mt-4">Checkout</button>
      )}
    </div>
  );
};

export default Cart;
