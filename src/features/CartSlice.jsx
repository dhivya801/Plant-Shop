import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  items: [], // {id,name,price,quantity,thumbnail}
  totalQuantity: 0,
  totalAmount: 0,
};

const recalc = (state) => {
  state.totalQuantity = state.items.reduce((s,i)=>s+i.quantity,0);
  state.totalAmount = state.items.reduce((s,i)=>s + i.quantity * i.price,0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const found = state.items.find(i=>i.id === item.id);
      if(found){
        found.quantity += 1;
      } else {
        state.items.push({...item, quantity:1});
      }
      recalc(state);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(i=>i.id !== id);
      recalc(state);
    },
    increment: (state, action) => {
      const id = action.payload;
      const found = state.items.find(i=>i.id===id);
      if(found){ found.quantity += 1; }
      recalc(state);
    },
    decrement: (state, action) => {
      const id = action.payload;
      const found = state.items.find(i=>i.id===id);
      if(found){
        found.quantity = Math.max(0, found.quantity - 1);
        if(found.quantity === 0){
          state.items = state.items.filter(i=>i.id !== id);
        }
      }
      recalc(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    }
  }
});

export const {addItem, removeItem, increment, decrement, clearCart} = cartSlice.actions;
export default cartSlice.reducer;
