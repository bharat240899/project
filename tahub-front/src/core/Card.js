import React,{useState} from 'react';

import { Link,Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {addItem,addWishList,updateItem,removeItem,removewishListItem} from './cartHelpers';
const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton=true, 
    showAddToWishListButton=true,
    cartUpdate = false,
    showRemoveProductButton = false,
    showRemovesProductButton = false,
    setRun = f => f,
    run = undefined
}) => {
    const [redirect,setRedirect]=useState(false)
    const [count, setCount] = useState(product.count);

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className='mr-2'>
                    <button className="btn btn-outline-primary mt-2  mb-2">
                        View Product
                         </button>

                </Link>
 

            )
        )  
    };


    const addToCart = () => {
         console.log('added');
        addItem(product, ()=>{
            setRedirect(true);
      });
    }  
    const addToWishList =() =>{
      addWishList(product,() =>{
        setRedirect(true)
      })
    }
    
      const shouldRedirect = redirect => {
        if (redirect) {
          return <Redirect to="/cart" />;
         
        }
      };
      
      const shouldRedirects = redirect => {
        if (redirect) {
          return <Redirect to="/wishList" />;
         
        }
      };
      
      
      const showAddToCart = showAddToCartButton => {
        return (
          showAddToCartButton && (
            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1  ">
              Add to cart
            </button>
          )
        );
      };
      
      const showAddToWishList =showAddToWishListButton =>{
        return(
          showAddToWishListButton &&(
          <button onClick={addToWishList} className="btn btn-outline-danger ml-2 ">
           Wishlist
          </button>
          )
        )
      };
      const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <button
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };
      const showRemovesButton = showRemovesProductButton => {
        return (
          showRemovesProductButton && (
            <button
              onClick={() => {
                removewishListItem(product._id);
                setRun(!run); // run useEffect in parent Cart
              }}
              className="btn btn-outline-danger mt-2 ml-2 mb-2"
            >
              Remove Product
            </button>
          )
        );
      };

    const showStock =(quantity) =>{
        return quantity >0 ? (<span className='badge badge-primary badge-pill'>InStock</span> ) :(<span className='badge badge-warning badge-pill'>Out of Stock</span>) 
    };
    const showSold =(sold) =>{
      return sold >8 ? (<div className='rating'><span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      
      </div> 
      
      ) 
      :(
        <div className='rating'><span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      <span className="fa fa-star checked text-success"></span>
      
      </div> 
      ) 
  };


    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };
    
  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };


    return (

        <div className="card mb-3">
            <div className="card-header name">
                {product.name}
            </div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                {shouldRedirects(redirect)}
                <ShowImage item={product} url="product" />
                <p className="lead mt-2 font-weight-bold">{product.description.substring(0, 100)}</p>
                <p className='black-10'>Author:{product.author}</p>
                <p className='black-10'>Price:${product.price}</p>
                <p className='black-9'>Category:{product.category && product.category.name}</p> 
                <p className='black-8'>Added on {moment(product.createdAt).fromNow()}</p>

                {showStock(product.quantity)}
                {showSold(product.sold)}
                <br />
                {showViewButton(showViewProductButton)}
                {showAddToCart(showAddToCartButton)}
                {showAddToWishList(showAddToWishListButton)}
                {showRemoveButton(showRemoveProductButton)}
                {showRemovesButton(showRemovesProductButton)}
                {showCartUpdateOptions(cartUpdate)}
               
            </div>



 







        </div>

    )
}


export default Card;