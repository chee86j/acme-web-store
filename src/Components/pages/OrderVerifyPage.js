import axios from "axios"
import React, {useEffect, useState} from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { XCircle, AlertCircle, CheckCircle, Loader } from 'react-feather'
import Spinner from "../Spinner"
import RemoveFromCartButton from "../RemoveFromCartButton"

const OrderVerifyPage = () => {
  const { cart } = useSelector((state) => state)
  const navigate = useNavigate()
  const [stock, setStock] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  let canCheckOut = true

  const fetchStock = async () => {
    try {
      setIsLoading(true)
      const productsToFetch = cart.cartItems.map(item => item.product.id)
      const response = await axios.put("/api/products/some", { data: productsToFetch })
      setStock(response.data)
    } catch (err) {
      setError("Failed to verify stock availability. Please try again.")
      console.error("Error fetching stock:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (cart.cartItems && cart.cartItems.length > 0) {
      fetchStock()
    } else {
      setIsLoading(false)
    }
  }, [cart])

  const verifyInStock = (productId, quantity) => {
    const item = stock.find(item => item.id === productId)
    if (item) {
      if (item.quantity - quantity >= 0) {
        return { enoughStock: true, msg: "In Stock", status: "success" }
      } else {
        return { 
          enoughStock: false, 
          msg: `Only ${item.quantity} available`, 
          status: "error"
        }
      }
    }
    return { enoughStock: false, msg: "Checking stock...", status: "loading" }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Spinner />
        <p className="mt-4 text-base-content/70">Verifying stock availability...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <XCircle size={48} className="text-error mb-4" />
        <p className="text-error text-center">{error}</p>
        <button 
          className="btn btn-primary mt-4"
          onClick={fetchStock}
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!cart.cartItems || cart.cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <AlertCircle size={48} className="text-warning mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-base-content/70 text-center mb-4">
          Add some items to your cart before proceeding to checkout.
        </p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order Verification</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Stock Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.cartItems.map((item) => {
              const check = verifyInStock(item.product.id, item.quantity)
              if (!check.enoughStock) {
                canCheckOut = false
              }
              
              return (
                <tr key={item.product.id}>
                  <td className="min-w-[200px]">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.imageURL}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="font-medium">{item.product.name}</div>
                    </div>
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    <div className={`flex items-center gap-2 ${
                      check.status === 'error' ? 'text-error' :
                      check.status === 'success' ? 'text-success' :
                      'text-base-content/70'
                    }`}>
                      {check.status === 'error' && <XCircle size={16} />}
                      {check.status === 'success' && <CheckCircle size={16} />}
                      {check.status === 'loading' && <Loader size={16} className="animate-spin" />}
                      {check.msg}
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => navigate("/cart")}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-8 gap-4">
        <button
          className="btn btn-outline"
          onClick={() => navigate("/cart")}
        >
          Back to Cart
        </button>
        <button
          disabled={!canCheckOut}
          className="btn btn-primary"
          onClick={() => navigate("/orders/create")}
        >
          Continue to Checkout
        </button>
      </div>
    </div>
  )
}

export default OrderVerifyPage



