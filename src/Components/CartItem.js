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
        <div className="card bg-base-200 shadow-xl h-full">
            <figure className="relative pt-[100%]">
                <img 
                    src={product.product.imageURL} 
                    alt={product.product.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </figure>
            <div className="card-body p-2 sm:p-4">
                <h2 className="card-title text-sm sm:text-base font-bold line-clamp-2">
                    {product.product.name}
                </h2>
                <div className="text-base sm:text-lg font-semibold text-primary">
                    {formatPrice(itemPrice)}
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1">
                        <button 
                            className="btn btn-circle btn-xs"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1}
                        >
                            <Minus size={12} />
                        </button>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(e.target.value)}
                            className="input input-bordered input-xs w-12 text-center px-0"
                        />
                        <button 
                            className="btn btn-circle btn-xs"
                            onClick={() => handleQuantityChange(quantity + 1)}
                        >
                            <Plus size={12} />
                        </button>
                    </div>
                    
                    <button 
                        className="btn btn-ghost btn-circle btn-xs"
                        onClick={handleRemove}
                        aria-label="Remove item"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                
                <div className="text-xs text-base-content/70 mt-2">
                    Subtotal: {formatPrice(itemSubtotal)}
                </div>
            </div>
        </div>
    )
}

export default CartItem
