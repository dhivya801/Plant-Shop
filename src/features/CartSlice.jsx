import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],          // { id, name, image, cost, quantity }
  totalQuantity: 0,
  totalAmount: 0,
};

const recalc = (state) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.totalAmount   = state.items.reduce((sum, item) => sum + item.quantity * item.cost, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem: (state, action) => {
      const newItem = action.payload;
      const existing = state.items.find((item) => item.name === newItem.name);
      if (!existing) {
        state.items.push({ ...newItem, quantity: 1 });
      } else {
        existing.quantity += 1;
      }
      recalc(state);
    },

    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
      recalc(state);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find((i) => i.name === name);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter((i) => i.name !== name);
        }
        recalc(state);
      }
    },

  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
