import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartQuantity, cartTotal } from "../util"
import { fetchGuestCart, fetchUserCart } from "../store"

const CartDropdown = () => {
  const { cart, auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserCart())
    } else {
      dispatch(fetchGuestCart())
    }
  }, [])

  const totalPrice = cartTotal(cart.cartItems)
  const totalQuantity = cartQuantity(cart.cartItems)
  return (
    <div
      tabIndex={0}
      className="card dropdown-content card-compact z-10 mt-3 w-52 bg-base-100 shadow"
    >
      <div className="card-body">
        <span className="text-lg font-bold">{totalQuantity} Items</span>
        <span className="text-info">Subtotal: {totalPrice}</span>
        <div className="card-actions">
          <Link to="/cart">
            <button className="btn-primary btn-block btn">View cart</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CartDropdown
