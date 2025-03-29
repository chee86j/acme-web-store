import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Plus, Minus, Trash2 } from 'react-feather'
import {
  removeFromCart,
  updateCartQuantity,
  updateGuestCartQuantity,
  removeFromGuestCart,
} from "../store"

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(parseFloat(price) || 0)
}

const CartItem = ({ product }) => {
    const {auth} = useSelector(state => state)
    const [quantity, setQuantity] = useState(parseInt(product.quantity) || 0)
    const dispatch = useDispatch()
    
    const handleQuantityChange = (newQuantity) => {
        const validQuantity = parseInt(newQuantity) || 0
        if (validQuantity < 0) return
        
        setQuantity(validQuantity)
        
        if (validQuantity === 0) {
            if (auth.id) {
                dispatch(removeFromCart({product: product}))
            } else {
                dispatch(removeFromGuestCart({product: {product}}))
            }
            return
        }

        if (auth.id) {
            dispatch(updateCartQuantity({
                product,
                quantity: validQuantity
            }))
        } else {
            dispatch(updateGuestCartQuantity({
                productId: product.product.id,
                quantity: validQuantity
            }))
        }
    }

    const handleRemove = () => {
        if (auth.id) {
            dispatch(removeFromCart({product: product}))
        } else {
            dispatch(removeFromGuestCart({product: {product}}))
        }
    }

    const itemPrice = parseFloat(product.product.price) || 0
    const itemSubtotal = itemPrice * quantity

    return (
        <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-200 max-w-sm mx-auto">
            <figure className="relative pt-[75%]">
                <img 
                    src={product.product.imageURL} 
                    alt={product.product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </figure>
            <div className="card-body p-3 sm:p-4">
                <h2 className="card-title text-base sm:text-lg font-bold line-clamp-2 min-h-[2.5rem]">
                    {product.product.name}
                </h2>
                <div className="text-lg sm:text-xl font-semibold text-primary">
                    {formatPrice(itemPrice)}
                </div>
                
                <div className="flex items-center justify-between mt-2 sm:mt-4">
                    <div className="flex items-center gap-1 sm:gap-2">
                        <button 
                            className="btn btn-circle btn-sm"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            <Minus size={14} />
                        </button>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            className="input input-bordered input-sm w-14 text-center px-1"
                        />
                        <button 
                            className="btn btn-circle btn-sm"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            <Plus size={14} />
                        </button>
                    </div>
                    
                    <button 
                        className="btn btn-ghost btn-circle btn-sm"
                        onClick={handleRemove}
                        aria-label="Remove item"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
                
                <div className="text-xs sm:text-sm text-base-content/70 mt-2">
                    Subtotal: {formatPrice(itemSubtotal)}
                </div>
            </div>
        </div>
    )
}

export default CartItem
