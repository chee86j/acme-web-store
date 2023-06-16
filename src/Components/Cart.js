import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchGuestCart, fetchUserCart, logout, removeFromCart } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { cartQuantity, cartTotal } from "../util"
import Spinner from "./Spinner"
import RemoveFromCartButton from "./RemoveFromCartButton"
import CartItem from "./CartItem"

const Cart = () => {
  const { cart, auth, product } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserCart())
    } else {
      dispatch(fetchGuestCart())
    }
  }, [])

  const cartItems = cart && cart.cartItems ? cart.cartItems : []
  const totalPrice = cartTotal(cart.cartItems)
  const totalItems = cartQuantity(cart.cartItems)

  return (
    <div>
      <h1 className="m-6 flex justify-center gap-10 text-2xl font-bold normal-case">
        Cart
      </h1>
      <hr />
      <div className="flex flex-row">
        <div className="m-4 mr-64 flex flex-shrink flex-wrap">
          {cartItems.map((product) => (
            <CartItem key={product.product.id} product={product} />
          ))}
        </div>
        <div
          className="card glass fixed mb-4 mt-4 w-64 p-4 h-36 right-4 bg-base-300"
        >
          <div className="badge badge-ghost my-2 flex-auto justify-center">
            <div className="text-2xl font-bold text-white"> Total: {totalPrice}</div>
          </div>
          <div className="text-1xl badge badge-ghost my-2 flex justify-center font-bold">
            {totalItems} Items
          </div>
          <button
            className="bg-yellow-300 text-black btn-block btn"
            onClick={() => {
              navigate("/orders/verify")
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
