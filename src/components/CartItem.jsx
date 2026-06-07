import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, removeItem, clearCart} from '../features/CartSlice';

export default function CartItem(){
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart?.items || []);
  const total = useSelector(s => s.cart?.totalAmount || 0);

  if(items.length === 0){
    return (
      <div style={{padding:20}}>
        <h3>Your cart is empty</h3>
        <button className="btn" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div style={{padding:20}}>
      <h3>Your Cart</h3>
      <div style={{display:'grid',gap:12}}>
        {items.map(it => (
          <div key={it.id} style={{display:'flex',gap:12,alignItems:'center',background:'#fff',padding:12,borderRadius:8}}>
            <img src={it.thumbnail} alt={it.name} style={{width:80,height:60,objectFit:'cover',borderRadius:6}} />
            <div style={{flex:1}}>
              <div style={{fontWeight:700}}>{it.name}</div>
              <div>Unit: ${it.price.toFixed(2)}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <button className="btn" onClick={()=>dispatch(decrement(it.id))}>-</button>
              <div>{it.quantity}</div>
              <button className="btn" onClick={()=>dispatch(increment(it.id))}>+</button>
            </div>
            <div style={{width:120,textAlign:'right',fontWeight:600}}>${(it.price * it.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:18,fontWeight:700}}>Total: ${total.toFixed(2)}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="btn" onClick={()=>alert('Coming Soon')}>Checkout</button>
          <button className="btn" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
}
