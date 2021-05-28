import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link, navigate } from '@reach/router'

export default props => {
    
    const[product, setProduct] = useState({})
    
    useEffect(()=> {
        console.log("checking for props", props.id)
        axios.get("http://localhost:8000/api/products/" + props.id)
        .then(res => setProduct(res.data))
        .catch(err=> console.log("Oh no error:", err))
    },[])

    const deleteProduct = productId => {
        console.log(productId)
        axios.delete('http://localhost:8000/api/product/' + productId)
            .then(res => {
                
            navigate("/");
            }).catch(err => console.log(err));
            
    }
    return (
        <div className ="detail">
            <h2>{product.title}</h2>
            <p>{product.desc}</p>
            <p>Price: ${product.price}</p>
            <Link to ="/">Home |</Link>
            <Link to={"/" + product._id + "/edit"}>Edit |</Link>
            <button onClick={(e)=>{deleteProduct(product._id)}}>Delete</button>
        </div>
    )

}



