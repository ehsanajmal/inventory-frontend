import React, { useState, useEffect } from 'react'
import { Header } from "./header";
import Swal from 'sweetalert2';
const Products = () => {
  
  useEffect(() => {
    fetchProducts()
  }, [])

  const [totalProducts, setTotalProducts] = useState([]);
  const [products, setProducts] = useState({
    name: '',
    description: '',
    groupID: '',
  });
  const fetchProducts = async () => {
    try {
      let productsresult = await fetch('http://localhost:4000/api/v1/products/viewAllProducts', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      productsresult = await productsresult.json();
      setTotalProducts(productsresult.newProduct)
    } catch (err) {
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setProducts({ ...products, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let result = await fetch('http://localhost:4000/api/v1/products/addProduct', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products)
      });
      result = await result.json();
      console.log(result);
      if (result.status) {
        await fetchProducts()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: 'Product is saved',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="my-2"></div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h3 className="title">
                Add Product
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Enter Product Name</label>
                <input onChange={handleChange} type="text" name="name" id="name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Product Description</label>
                <input onChange={handleChange} type="text" name="description" id="description" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Group ID</label>
                <input onChange={handleChange} type="text" name="groupID" id="groupID" className="form-control" />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">Create Product</button>
            </div>
          </div>
        </form>
        <hr /><br />
        <div className="card">
          <div className="card-header"><h3 className="title">All Products</h3></div>
          <div className="card-body">
            <div className="table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Descirption</th>
                    <th>Group ID</th>
                  </tr>
                </thead>
                <tbody>
                  {totalProducts && totalProducts.length > 0 ? (
                    totalProducts.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.groupID}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No Products available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products