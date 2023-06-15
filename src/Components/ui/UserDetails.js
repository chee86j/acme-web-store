import React, { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"

function UserDetails({ user }) {
  const [selectedTab, setSelectedTab] = useState(1)
  if (!user) return null
  return (
    <>
      <h2 className="font-bold">{user.username}'s Details</h2>
      <div className="tabs tabs-boxed">
        <a
          className={`tab ${selectedTab === 1 && "tab-active"}`}
          onClick={() => setSelectedTab(1)}
        >
          Orders
        </a>
        <a
          className={`tab ${selectedTab === 2 && "tab-active"}`}
          onClick={() => setSelectedTab(2)}
        >
          Cart
        </a>
        <a
          className={`tab ${selectedTab === 3 && "tab-active"}`}
          onClick={() => setSelectedTab(3)}
        >
          Reviews
        </a>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {selectedTab === 1 && (
            <div className="overflow-x-auto">
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Created At</th>
                    <th>Total Items</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {user.orders &&
                    user.orders
                      .filter((order) => {
                        return order.isCart !== true
                      })
                      .map((order) => {
                        const totalItems = order.lineItems.reduce(
                          (acc, item) => acc + item.quantity,
                          0
                        )
                        const totalPrice = order.lineItems.reduce(
                          (acc, item) =>
                            acc + item.quantity * item.product.price,
                          0
                        )
                        return (
                          <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>
                              {new Date(order.createdAt).toLocaleString()}
                            </td>
                            <td>{totalItems}</td>
                            <td>{totalPrice}</td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === 2 && (
            <div className="overflow-x-auto">
              <div className="flex flex-row">
                <div className="w-1/2">
                  Total Items:{" "}
                  {user.cart.cartItems.length > 0
                    ? user.cart.cartItems.length
                    : 0}
                </div>
                <div className="w-1/2">
                  Total Price: $
                  {user.cart.cartItems.reduce(
                    (acc, item) => acc + item.quantity * item.product.price,
                    0
                  )}
                </div>
              </div>
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Added On</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {user.cart.cartItems &&
                    user.cart.cartItems.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td>
                            <Link
                              to={`/products/${item.product.id}`}
                              className="link-primary link"
                            >
                              {item.product.name}
                            </Link>
                          </td>
                          <td>{new Date(item.createdAt).toLocaleString()}</td>
                          <td>{item.quantity}</td>
                          <td>${item.quantity * item.product.price}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === 3 && (
            <div className="overflow-x-auto">
              <table className="table-xs table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Created At</th>
                    <th>Rating</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {user.reviews &&
                    user.reviews.map((review) => {
                      return (
                        <tr key={review.id}>
                          <td>
                            <Link to={`/products/${review.product.id}`}>
                              {review.product.name}
                            </Link>
                          </td>
                          <td>
                            {new Date(review.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            <Rating rating={review.rating} />
                          </td>
                          <td>{review.description}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserDetails
