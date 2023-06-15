import React, { useState, useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
import { Link, useNavigate } from "react-router-dom"
import { getAverageRating } from "../../util"
import Rating from "../ui/Rating"

const Orders = () => {
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate("/account/create")
  }

  const { auth } = useSelector((state) => state)

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const token = window.localStorage.getItem("token")
      const response = await axios.get("/api/orders", {
        headers: {
          authorization: token,
        },
      })
      setOrders(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [auth])

  console.log(orders)

  const LogedIn = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Products</th>
            <th>Date Placed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={uuidv4()}>
                <td>{order.lookUpId}</td>
                <td>{order.lineItems.length}</td>
                <td>{order.createdAt}</td>
                <td>shipped</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => window[order.id].showModal()}
                  >
                    View Details
                  </button>
                  <dialog id={order.id} className="modal">
                    <div className="text-white">
                      <form
                        method="dialog"
                        className="modal-box"
                        id="myCoolBackground"
                      >
                        <div className="m-2 flex">
                          <div className="m-2 rounded-lg p-6 backdrop-blur">
                            <h1>Order Number {order.lookUpId}</h1>
                            <h2>
                              Placed By {order.firstName} {order.lastName}
                            </h2>
                            <h2>Created at: {order.createdAt}</h2>
                          </div>
                          <div className="m-2 rounded-lg p-6 backdrop-blur">
                            <h1>Shippng To</h1>
                            <h2>{order.street}</h2>
                            <h2>
                              {order.city}, {order.state} {order.zip}
                            </h2>
                            <h2>Arriving in: 2 days</h2>
                          </div>
                        </div>
                        <h1 className="mx-auto text-lg">Order Items</h1>
                        <div>
                          {order.lineItems.map((item) => {
                            return (
                              <div
                                key={uuidv4()}
                                className="card card-side m-2 shadow-xl backdrop-blur"
                              >
                                <figure>
                                  <img
                                    src={item.product.imageURL}
                                    alt={item.product.name}
                                  />
                                </figure>
                                <div className="card-body">
                                  <h2 className="card-title">
                                    {item.product.name}
                                  </h2>
                                  <h3>Quantity {item.quantity}</h3>
                                  <h3>{item.product.price}</h3>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                        <div className="modal-action">
                          <button className="btn">Close</button>
                        </div>
                      </form>
                    </div>
                  </dialog>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  const NotLogedIn = () => {
    const [pageState, setPageState] = useState("form")
    const [order, setOrder] = useState({})

    const Form = () => {
      const findOrder = async (event) => {
        event.preventDefault()
        const response = await axios.get(`/api/orders/${orderId}`, {
          headers: {
            authorization: email,
          },
        })
        setOrder(response.data)
        console.log(response.data)
        setPageState("found")
      }

      const [orderId, setOrderId] = useState("")
      const [email, setEmail] = useState("")
      return (
        <div className="shadow-2x m-auto mb-4 mt-4 flex w-3/4 max-w-md justify-center rounded-xl border-2 border-secondary bg-base-200">
          <div className="card w-full p-3">
            <h2 className="card-title">
              <div className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-3xl font-extrabold text-transparent">
                ORDER STATUS
              </div>
            </h2>
            <div className="card-body">
              <div className="flex flex-row">
                <span className="flex-grow">
                  Did You Check Out As A Guest? Or do you just want to check
                  your Order Status without signing in?
                </span>
                <div className="avatar self-end">
                  <div className="mask mask-squircle mx-3 my-3 h-20 w-20 object-fill">
                    <img
                      src={
                        "https://static.wikia.nocookie.net/supermarioglitchy4/images/3/3a/Mega_Mushroom_Artwork_-_New_Super_Mario_Bros.png"
                      }
                      alt="mushroom"
                    />
                  </div>
                </div>
              </div>
              <div>
                Your ACME Web Store Grants You Acceess To All Of ACME, Including
                The Shop, Learning System, and Wishlists.{" "}
              </div>
              <form
                className="shadow-2x m-auto mb-4 mt-4 flex w-3/4 flex-col flex-wrap content-center justify-center "
                onSubmit={findOrder}
              >
                <h1 class="my-3 text-center">ORDER NUMBER</h1>
                <input
                  value={orderId}
                  onChange={(event) => setOrderId(event.target.value)}
                />
                <h1 class="my-3 text-center">EMAIL</h1>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button class="btn-secondary btn mx-5 my-5 md:btn-sm">
                  Find Order
                </button>
                <h1 class="mt-2">NEED AN ACME ACCOUNT?</h1>
                <button
                  className="btn-secondary btn mx-5 my-5 md:btn-sm"
                  onClick={() => handleSignUp()}
                >
                  Sign Up Here
                </button>
              </form>
            </div>
          </div>
        </div>
      )
    }

    const OrderFound = () => {
      return <h1>order found</h1>
    }

    if (pageState === "form") {
      return <Form />
    } else if (pageState === "found") {
      return <OrderFound />
    }
  }

  return (
    <div>
      <h1>Orders</h1>
      {auth.id && <LogedIn />}
      {!auth.id && <NotLogedIn />}
    </div>
  )
}

export default Orders
