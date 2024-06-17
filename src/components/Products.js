import { useContext } from "react";
import productsData from "../assets/productsData";
import { CartContext } from "../store";
import { type } from "@testing-library/user-event/dist/type";

export default function Products(){
    const [state,dispatch] = useContext(CartContext);
    return(
      <div className="row row-cols-3 g-3">
        {productsData.map((Product)=>{
          return(
            <div className="col" key={Product.id}>
            <div className="card" >
                <img src={Product.img} className="card-img-top" alt="..."/>
                <div className="card-body ">
                  <h6 className="card-title mb-3">{Product.title}<span className="float-end">NT$ {Product.price}</span></h6>
                  <select name="" id="" className="form-select"
                      value={Product.quantity}
                      onClick={(e)=>{
                        e.preventDefault();
                        const quantity = parseInt(e.target.value);
                        dispatch({
                          type:'CHANGE_PRODUCT_QUANTITY',
                          payload:{
                            ...Product,
                            quantity,
                          },
                        });
                      }}>
                      {[...Array(20)].map((_, i)=>{
                        return(<option value={i+1} key={i}>{i+1}</option>)
                      })}
                    </select>
                  <button type="button" className="btn btn-outline-success w-100"
                  onClick={(e)=>{
                    //取得上一個兄弟節點select
                    const quantity = parseInt(e.target.previousSibling.value)
                    e.target.previousSibling.value = 1;
                    dispatch({
                      type:'ADD_TO_CART',
                      payload:{
                        ...Product,
                        quantity
                      },
                    });
                  }}>加入購物車</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    );
}