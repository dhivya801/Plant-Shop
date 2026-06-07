# Plant Shop

This workspace contains a small React app for a plant shop sample.

Files added:

- [README.md](README.md)
- [src/components/AboutUs.jsx](src/components/AboutUs.jsx)
- [src/App.css](src/App.css)
- [src/App.jsx](src/App.jsx)
- [src/features/CartSlice.jsx](src/features/CartSlice.jsx)
- [src/components/ProductList.jsx](src/components/ProductList.jsx)
- [src/components/CartItem.jsx](src/components/CartItem.jsx)

Notes:

- The app uses a Redux Toolkit slice in `src/features/CartSlice.jsx` for the cart logic.
- `ProductList.jsx` contains three categories with six plants each and an "Add to Cart" button that disables after adding.
- `CartItem.jsx` shows cart items, thumbnails, quantity controls, and a total amount.
