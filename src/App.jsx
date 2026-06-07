import React from 'react';
import './App.css';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import {useSelector} from 'react-redux';

export default function App() {
  const totalQty = useSelector(s => s.cart?.totalQuantity || 0);

  return (
    <div>
      <header className="navbar">
        <div style={{fontWeight:700}}>Green Haven</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#cart" style={{display:'flex',alignItems:'center'}}>Cart <span className="cart-badge">{totalQty}</span></a>
        </nav>
      </header>
      <main>
        <section className="landing">
          <div className="card">
            <h1>Green Haven</h1>
            <p>Your friendly neighborhood plant shop</p>
            <button className="btn" onClick={() => document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}>
              Get Started
            </button>
          </div>
        </section>
        <section id="products" style={{padding:'2rem'}}>
          <ProductList />
        </section>
        <section id="cart" style={{padding:'2rem',background:'transparent'}}>
          <CartItem />
        </section>
      </main>
    </div>
  );
}
