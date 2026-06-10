import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from '../features/CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Coming Soon! Thank you for shopping with Paradise Nursery.');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <h2>Your cart is empty 🌿</h2>
        <p>Browse our beautiful plants and add some to your cart!</p>
        <button
          className="get-started-button"
          onClick={handleContinueShopping}
          style={{
            background: '#2d6a4f', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 24px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto' }}>
      <h2 style={{ color: '#2d6a4f', marginBottom: 24 }}>Shopping Cart 🛒</h2>

      {/* Cart Items */}
      <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
        {cartItems.map((item) => (
          <div
            key={item.name}
            style={{
              display: 'flex', gap: 16, alignItems: 'center',
              background: 'rgba(255,255,255,0.95)', borderRadius: 12,
              padding: 16, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            }}
          >
            {/* Thumbnail */}
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
            />

            {/* Name & Unit Price */}
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 4px', color: '#0b3d2e' }}>{item.name}</h4>
              <p style={{ margin: '0 0 4px', color: '#555', fontSize: '0.9rem' }}>
                Unit Price: <strong>${item.cost}</strong>
              </p>
              {/* Total cost for this item */}
              <p style={{ margin: 0, color: '#2d6a4f', fontWeight: 700 }}>
                Total: ${calculateTotalCost(item)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                onClick={() => handleDecrement(item)}
                style={{
                  background: '#2d6a4f', color: '#fff', border: 'none',
                  borderRadius: 6, width: 30, height: 30, fontSize: '1.2rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                −
              </button>
              <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>
                {item.quantity}
              </span>
              <button
                onClick={() => handleIncrement(item)}
                style={{
                  background: '#2d6a4f', color: '#fff', border: 'none',
                  borderRadius: 6, width: 30, height: 30, fontSize: '1.2rem',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                +
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleRemove(item)}
              style={{
                background: '#c0392b', color: '#fff', border: 'none',
                borderRadius: 6, padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem'
              }}
            >
              🗑 Delete
            </button>
          </div>
        ))}
      </div>

      {/* Total Cart Amount */}
      <div style={{
        background: 'rgba(255,255,255,0.95)', borderRadius: 12,
        padding: 20, boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        marginBottom: 24, textAlign: 'right'
      }}>
        <h3 style={{ margin: 0, color: '#2d6a4f' }}>
          Total Amount: <span style={{ color: '#0b3d2e' }}>${Number(totalAmount).toFixed(2)}</span>
        </h3>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
        {/* Continue Shopping */}
        <button
          onClick={handleContinueShopping}
          style={{
            background: '#fff', color: '#2d6a4f', border: '2px solid #2d6a4f',
            borderRadius: 8, padding: '10px 24px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          ← Continue Shopping
        </button>

        {/* Checkout — Coming Soon */}
        <button
          onClick={handleCheckoutShopping}
          style={{
            background: '#2d6a4f', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 24px', fontSize: '1rem', cursor: 'pointer'
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
