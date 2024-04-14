import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getWishList } from './cartHelpers';
import Card from './Card';


const WishList=() =>{
    const [items,setItems]=useState([])
    const [run, setRun] = useState(false);

    useEffect(()=>{
        setItems(getWishList())
    }, [run])

    
    const displayItems = items => {
        return (
            <div>
                <h2>Your WishList has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card 
                        key={i}
                        product={product}
                        showAddToWishListButton={false}
                        showAddToCartButton={true}
                        
                        showRemovesProductButton={true}
                        setRun={setRun}
                        run={run}  
                    />  
                ))}
            </div>
        );
    };
    const noItemsMessage = () => (
        <h2>
            Your WishList is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
        
    );

    return(
        <Layout 
            title="WishListed Items"
            descption=""
            className='container-fluid'>
                <div className="row">
                <div className="col-md-6">{items.length > 0 ? displayItems(items) : noItemsMessage()}
                </div>
                </div>

            
            </Layout>
    );
}



export default WishList;