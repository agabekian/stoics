import React, {useState} from 'react'
import axios from 'axios'

export default (props) => {
    // const {getProducts} = props
    //keep track of what is being typed via useState hook
    const [title, setTitle] = useState(""); 
    const [desc, setDesc] = useState("");
    const [price, setPrice] = useState("");
    //handler when the form is submitted
    const onSubmitHandler = e => {
        e.preventDefault();
        //make a post request to create a new product
        axios.post('http://localhost:8000/api/product', {
            title,
            desc,
            price
        })
            .then(res=>{
                console.log(res)
                props.getProducts()
                // refresh product line
            })
            .catch(err=>console.log(err))
    }
 //onChange to update product fields
    return (
    <form onSubmit={onSubmitHandler}>
        <p>
            <label>Title</label><br/>
            <input type="text" onChange = {(e)=>setTitle(e.target.value)}/>
        </p>
        <p>
            <label>Description</label><br/>
            <input type="text" onChange = {(e)=>setDesc(e.target.value)}/>
        </p>
        <p>
            <label>Price</label><br/>
            <input type="number" onChange = {(e)=>setPrice(e.target.value)}/>
            {/* force only positive number, -from stackoverflo -throws red error*/}
        </p>
        <input className="btn btn-warning" type="submit" value="Create"/>
    </form>
)
}
