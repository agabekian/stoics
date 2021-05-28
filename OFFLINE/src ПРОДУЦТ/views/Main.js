import React, {useEffect, useState} from 'react'
import ProductForm from '../components/ProductForm';
import ProductsView from '../components/ProductsView';
import axios from 'axios'

export default () => {
    const[productLine, setProductLine] = useState([])
    const[loaded, setLoaded] = useState(false)
    useEffect(() => {
        getProducts()
        // .catch(err=>console.log("Error: ", err))
    },[])

    const getProducts =() => {
        axios.get('http://localhost:8000/api/products')
        .then(res => {
            setProductLine(res.data)
            setLoaded(true)
        })

    }
    
    const removeFromDom = productId => {
        setProductLine(productLine.filter(item => item._id !== productId));
    }
    return (
        <>
        <ProductForm getProducts= {getProducts} />
        <hr/>
        {loaded && <ProductsView productLine={productLine} removeFromDom={removeFromDom}/>}
        </>
    )
}
