import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name : 'user',
  initialState : {name : 'kim', age : 20},
  reducers : {
    changeName(state){
      state.name = 'park'
    },
    changeAge(state, action){
      state.age += action.payload
    }
  }

})



let stock = createSlice({
  name : 'stock',
  initialState : [10, 11, 12]
})

let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ],
  reducers : {
    addCount(state, action){
     state.map(function(data){
      if(data.id == action.payload){
        data.count += 1;
      }
     })
    }
  } 
})

export let { changeName, changeAge } = user.actions;
export let { addCount } = cart.actions;

export default configureStore({
  reducer : {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
  }
})