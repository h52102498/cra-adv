import { useReducer } from "react";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Carts from "./components/Carts";
import { CartContext, cartReducer, cartInit } from "./store";



function App() {
  
  const reducer = useReducer(cartReducer,cartInit);


  return (
    <CartContext.Provider value={reducer}>
      <Navbar></Navbar>
      <div className="container mt-4">
        {/* 外層格線 */}
        <div className="row">
          <div className="col-md-7">
            <Products></Products>
          </div>
          <div className="col-md-5">
            <Carts></Carts>
          </div>
        </div>
      </div>
    </CartContext.Provider>
  );
}


export default App;

