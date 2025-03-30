import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchGuestCart, fetchUserCart, logout, removeFromCart } from "../store"
import { Link, useNavigate } from "react-router-dom"
import { cartQuantity, cartTotal } from "../util"
import Spinner from "./Spinner"
import { ShoppingBag } from 'react-feather'
import CartItem from "./CartItem"

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price || 0)
}

const calculateCartTotal = (items) => {
  if (!items || !Array.isArray(items)) return 0
  return items.reduce((total, item) => {
    const price = parseFloat(item.product.price) || 0
    const quantity = parseInt(item.quantity) || 0
    return total + (price * quantity)
  }, 0)
}

const Cart = () => {
  const { cart, auth, product } = useSelector((state) => state)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCart = async () => {
      try {
        if (auth.id) {
          await dispatch(fetchUserCart())
        } else {
          await dispatch(fetchGuestCart())
        }
      } finally {
        setIsLoading(false)
      }
    }
    loadCart()
  }, [])

  const cartItems = cart && cart.cartItems ? [...cart.cartItems].sort((a, b) => {
    return a.product.id.localeCompare(b.product.id)
  }) : []
  
  const subtotal = calculateCartTotal(cartItems)
  const totalItems = cartQuantity(cart.cartItems || [])
  const tax = subtotal * 0.0825 // 8.25% tax rate
  const finalTotal = subtotal + tax

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>
  }

  if (!cartItems.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <ShoppingBag size={64} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-4">Add some items to get started!</p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="flex-grow">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
            {cartItems.map((product) => (
              <div className="w-full" key={`${product.product.id}-${product.id}`}>
                <CartItem product={product} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full lg:w-96">
          <div className="card bg-base-300 p-4 sm:p-6 sticky top-4">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal ({totalItems} items)</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Tax (8.25%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <div className="border-t border-base-content/20 pt-3">
                <div className="flex justify-between font-semibold text-base sm:text-lg">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary w-full mt-4 sm:mt-6"
              onClick={() => navigate("/orders/verify")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
