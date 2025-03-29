import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link, useNavigate } from "react-router-dom"
import { getAverageRating } from "../../util"
import { Package, Loader, Calendar, Box, MapPin, Truck } from 'react-feather'
import Rating from "../ui/Rating"
import Spinner from "../Spinner"

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price)
}

const Orders = () => {
  const navigate = useNavigate()
  const { auth } = useSelector((state) => state)
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrders = async () => {
    try {
      setIsLoading(true)
      const token = window.localStorage.getItem("token")
      const response = await axios.get("/api/orders", {
        headers: {
          authorization: token,
        },
      })
      setOrders(response.data)
    } catch (error) {
      setError("Failed to fetch orders. Please try again.")
      console.error("Error fetching orders:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (auth.id) {
      fetchOrders()
    } else {
      setIsLoading(false)
    }
  }, [auth])

  const LoggedIn = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Spinner />
          <p className="mt-4 text-base-content/70">Loading your orders...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
          <Package size={48} className="text-error mb-4" />
          <p className="text-error text-center">{error}</p>
          <button 
            className="btn btn-primary mt-4"
            onClick={fetchOrders}
          >
            Try Again
          </button>
        </div>
      )
    }

    if (orders.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
          <Package size={48} className="text-base-content/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-base-content/70 text-center mb-4">
            Start shopping to create your first order!
          </p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      )
    }

    return (
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="font-medium">{order.lookUpId}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{order.lineItems.length} items</td>
                <td>
                  <span className="badge badge-success">Shipped</span>
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => window[order.id].showModal()}
                  >
                    View Details
                  </button>
                  <dialog id={order.id} className="modal">
                    <div className="modal-box max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-lg font-semibold">
                            <Box size={20} />
                            Order #{order.lookUpId}
                          </div>
                          <div className="flex items-center gap-2 text-base-content/70">
                            <Calendar size={16} />
                            {formatDate(order.createdAt)}
                          </div>
                          <div className="flex items-center gap-2 text-base-content/70">
                            <Truck size={16} />
                            Arriving in 2 days
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 font-semibold">
                            <MapPin size={20} />
                            Shipping Address
                          </div>
                          <div className="text-base-content/70">
                            {order.firstName} {order.lastName}<br />
                            {order.street}<br />
                            {order.city}, {order.state} {order.zip}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Order Items</h3>
                        {order.lineItems.map((item) => (
                          <div key={uuidv4()} className="flex gap-4 items-center p-4 bg-base-200 rounded-lg">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.product.imageURL}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <div className="text-sm text-base-content/70">
                                Quantity: {item.quantity}
                              </div>
                            </div>
                            <div className="text-right font-medium">
                              {formatPrice(item.product.price)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const NotLoggedIn = () => {
    const [pageState, setPageState] = useState("form")
    const [order, setOrder] = useState(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState(null)

    const Form = () => {
      const [orderId, setOrderId] = useState("")
      const [email, setEmail] = useState("")

      const findOrder = async (event) => {
        event.preventDefault()
        setIsSearching(true)
        setSearchError(null)

        try {
          const response = await axios.get(`/api/orders/${orderId}`, {
            headers: {
              authorization: email,
            },
          })
          setOrder(response.data)
          setPageState("found")
        } catch (error) {
          setSearchError("Order not found. Please check your order number and email.")
          console.error("Error finding order:", error)
        } finally {
          setIsSearching(false)
        }
      }

      return (
        <div className="max-w-lg mx-auto p-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <Package size={32} className="text-primary" />
                <h2 className="card-title text-2xl">Track Your Order</h2>
              </div>

              <form onSubmit={findOrder} className="space-y-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Order Number</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter your order number"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                {searchError && (
                  <div className="alert alert-error">
                    <p>{searchError}</p>
                  </div>
                )}

                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <>
                      <Loader size={16} className="animate-spin mr-2" />
                      Searching...
                    </>
                  ) : (
                    'Track Order'
                  )}
                </button>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <p className="mb-4">Create an account to track all your orders in one place</p>
                <button
                  className="btn btn-outline btn-primary"
                  onClick={() => navigate("/account/create")}
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    const OrderFound = () => {
      if (!order) return null

      return (
        <div className="max-w-2xl mx-auto p-6">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex items-center gap-4 mb-6">
                <Package size={32} className="text-primary" />
                <h2 className="card-title text-2xl">Order Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <Box size={20} />
                    Order #{order.lookUpId}
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Calendar size={16} />
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="flex items-center gap-2 text-base-content/70">
                    <Truck size={16} />
                    Arriving in 2 days
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <MapPin size={20} />
                    Shipping Address
                  </div>
                  <div className="text-base-content/70">
                    {order.firstName} {order.lastName}<br />
                    {order.street}<br />
                    {order.city}, {order.state} {order.zip}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Order Items</h3>
                {order.lineItems.map((item) => (
                  <div key={uuidv4()} className="flex gap-4 items-center p-4 bg-base-300 rounded-lg">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.imageURL}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <div className="text-sm text-base-content/70">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right font-medium">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button
                  className="btn btn-ghost"
                  onClick={() => setPageState("form")}
                >
                  Track Another Order
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/account/create")}
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return pageState === "form" ? <Form /> : <OrderFound />
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      {auth.id ? <LoggedIn /> : <NotLoggedIn />}
    </div>
  )
}

export default Orders
