import { createContext, useContext } from "react";


function calculateTotalPrice(cartList) {
    return cartList.map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}

export const cartInit = {
    cartList:[],
    productState:0
  };

export const cartReducer = (state,action)=>{
    const cartList = [...state.cartList]
    let productState = state.productState;
    productState === 0 ? productState = 1: productState = state.productState;
    const index = cartList.findIndex((item)=>item.id===action.payload.id);
    switch(action.type){
      case 'ADD_TO_CART':
        if (index===-1) {
          //還未加到購物車內
          cartList.push(action.payload);
          
        } else {
          //當前的購物車項目與加入的項目一致
          cartList[index].quantity += action.payload.quantity;
          if(cartList[index].quantity > 20){
            cartList[index].quantity = 20;
            alert(`${cartList[index].title} 加點數量超過上限！`);
          }
        }
        return{
          ...state,
          cartList,
          total:calculateTotalPrice(cartList),
        };
      case 'CHANGE_CART_QUANTITY':
        cartList[index].quantity = action.payload.quantity;
        return{
          ...state,
          cartList,
          total:calculateTotalPrice(cartList),
        };
      case 'CHANGE_PRODUCTS_QUANTITY':
        productState = action.payload.quantity;
        return {
            ...state,
            productState
        };
      case 'REMOVE_CART_ITEM':
        cartList.splice(index,1);
        return{
          ...state,
          cartList,
          total:calculateTotalPrice(cartList),
        };
      default:
      return state
    }
  }

export const CartContext = createContext({})