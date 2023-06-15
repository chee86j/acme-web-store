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
      <h1 className="flex justify-center gap-10 m-6 text-2xl font-bold normal-case">Cart</h1>
      <hr />
      <div className="flex flex-row">
        <div className="m-4 flex flex-shrink flex-wrap mr-64">
          {cartItems.map((product) => (
            <CartItem key={product.product.id} product={product}/>
          ))}
        </div>
        <div className="card w-64 glass fixed mt-4 p-4" style={{height: "150px", right: 15}}>
          <div className="badge badge-ghost">
            <div className="text-lg font-bold"> Total: ${totalPrice}</div>
          </div>
          <div>{totalItems} Items</div>
          <button className="btn-primary btn-block btn" onClick={()=>{navigate("/orders/verify")}}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart
