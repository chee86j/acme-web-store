import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { cartQuantity, cartTotal } from "../util"
import { fetchGuestCart, fetchUserCart } from "../store"
import { ShoppingBag } from 'react-feather'

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(price) || 0)
}

const calculateCartTotal = (items) => {
  if (!items || !Array.isArray(items)) return 0
  return items.reduce((total, item) => {
    const price = parseFloat(item.product.price) || 0
    const quantity = parseInt(item.quantity) || 0
    return total + (price * quantity)
  }, 0)
}

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

  const items = cart.cartItems || []
  const displayItems = items.slice(0, 3)
  const remainingItems = Math.max(0, items.length - 3)
  const totalPrice = calculateCartTotal(items)
  const totalQuantity = cartQuantity(items)

  if (items.length === 0) {
    return (
      <div className="dropdown-content card card-compact w-72 sm:w-80 bg-base-100 shadow-xl p-3 sm:p-4">
        <div className="flex flex-col items-center py-4 sm:py-6">
          <ShoppingBag size={28} className="text-base-content/50 mb-2" />
          <p className="text-sm text-base-content/70">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="dropdown-content card card-compact w-72 sm:w-80 bg-base-100 shadow-xl">
      <div className="card-body p-3 sm:p-4">
        <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Cart Items</h3>
        
        <div className="space-y-3 sm:space-y-4">
          {displayItems.map((item) => {
            const itemPrice = parseFloat(item.product.price) || 0
            const quantity = parseInt(item.quantity) || 0
            
            return (
              <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.imageURL}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-medium text-xs sm:text-sm line-clamp-1">{item.product.name}</h4>
                  <div className="text-xs sm:text-sm text-base-content/70">
                    {quantity} × {formatPrice(itemPrice)}
                  </div>
                </div>
              </div>
            )
          })}
          
          {remainingItems > 0 && (
            <div className="text-xs sm:text-sm text-base-content/70 text-center border-t border-base-content/10 pt-2">
              and {remainingItems} more item{remainingItems > 1 ? 's' : ''}...
            </div>
          )}
        </div>

        <div className="border-t border-base-content/10 mt-3 sm:mt-4 pt-3 sm:pt-4">
          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span className="font-medium">{totalQuantity} Items</span>
            <span className="font-bold">{formatPrice(totalPrice)}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <Link to="/cart" className="w-full">
              <button className="btn btn-primary btn-sm sm:btn-md w-full">View Cart</button>
            </Link>
            <Link to="/orders/verify" className="w-full">
              <button className="btn btn-outline btn-primary btn-sm sm:btn-md w-full">Checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartDropdown
