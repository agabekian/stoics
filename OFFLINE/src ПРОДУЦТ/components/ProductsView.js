import React from 'react'
import {Link} from '@reach/router'
import axios from 'axios'

export default props => {
    const { removeFromDom } = props;
    const deleteProduct = productId => {
        axios.delete('http://localhost:8000/api/product/' + productId)
            .then(res => {
                removeFromDom(productId)
            })
    }
    return(
        <div className="detail">
            {props.productLine.map((item, index)=>{
                return <div className="listline" key = {index}>
                <Link to = {`/${item._id}`}>
    {/* above-react doesnt like interpolated strings unless in {}, double quotes work thou */}
                <p>{item.title}</p>
                </Link>
                {item.desc} ${item.price}
                
                <button className="btn btn-danger" onClick={(e)=>{deleteProduct(item._id)}}>Delete x</button>
                </div>
            })}
        </div>
    )
}


