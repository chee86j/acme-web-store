import React, { useState } from 'react'
import { Plus, Minus, Trash2 } from 'react-feather'
import { formatPrice } from '../util'
import { useCart } from '../hooks/useCart'

const CartItem = ({ product }) => {
    const [quantity, setQuantity] = useState(parseInt(product.quantity) || 0)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState(null)
    const { updateQuantity, removeItem } = useCart()
    
    const handleQuantityChange = async (newQuantity) => {
        const validQuantity = parseInt(newQuantity) || 0
        if (validQuantity < 0) return
        
        setQuantity(validQuantity)
        setIsUpdating(true)
        setError(null)
        
        try {
            await updateQuantity(product, validQuantity)
        } catch (err) {
            setError('Failed to update quantity')
            setQuantity(parseInt(product.quantity) || 0)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRemove = async () => {
        setIsUpdating(true)
        setError(null)
        
        try {
            await removeItem(product)
        } catch (err) {
            setError('Failed to remove item')
            setIsUpdating(false)
        }
    }
    
    const handleQuantityInputChange = (e) => {
        setQuantity(e.target.value)
    }
    
    const handleQuantityInputBlur = () => {
        handleQuantityChange(quantity)
    }
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleQuantityInputBlur()
        }
    }

    const itemPrice = parseFloat(product.product.price) || 0
    const itemSubtotal = itemPrice * quantity
    const productName = product.product.name || 'Product'

    return (
        <article className="card bg-base-200 shadow-xl h-full relative" aria-label={`Cart item: ${productName}`}>
            {isUpdating && (
                <div className="absolute inset-0 bg-base-200/70 flex items-center justify-center z-10" aria-live="polite">
                    <span className="loading loading-spinner loading-md"></span>
                    <span className="sr-only">Updating cart</span>
                </div>
            )}
            
            {error && (
                <div className="absolute top-2 right-2 left-2 bg-error text-error-content p-2 rounded text-xs z-20" 
                    role="alert" 
                    aria-live="assertive">
                    {error}
                </div>
            )}
            
            <figure className="relative pt-[100%]">
                <img 
                    src={product.product.imageURL} 
                    alt={productName}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    loading="lazy"
                />
            </figure>
            <div className="card-body p-2 sm:p-4">
                <h2 className="card-title text-sm sm:text-base font-bold line-clamp-2">
                    {productName}
                </h2>
                <div className="text-base sm:text-lg font-semibold text-primary" aria-label={`Price: ${formatPrice(itemPrice)}`}>
                    {formatPrice(itemPrice)}
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex items-center gap-1" role="group" aria-label="Quantity controls">
                        <button 
                            className="btn btn-circle btn-xs"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={quantity <= 1 || isUpdating}
                            aria-label="Decrease quantity"
                        >
                            <Minus size={12} aria-hidden="true" />
                        </button>
                        <input
                            type="number"
                            min="0"
                            value={quantity}
                            onChange={handleQuantityInputChange}
                            onBlur={handleQuantityInputBlur}
                            onKeyDown={handleKeyDown}
                            className="input input-bordered input-xs w-12 text-center px-0"
                            aria-label={`Quantity, currently ${quantity}`}
                            disabled={isUpdating}
                        />
                        <button 
                            className="btn btn-circle btn-xs"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={isUpdating}
                            aria-label="Increase quantity"
                        >
                            <Plus size={12} aria-hidden="true" />
                        </button>
                    </div>
                    
                    <button 
                        className="btn btn-ghost btn-circle btn-xs"
                        onClick={handleRemove}
                        aria-label={`Remove ${productName} from cart`}
                        disabled={isUpdating}
                    >
                        <Trash2 size={14} aria-hidden="true" />
                    </button>
                </div>
                
                <div className="text-xs text-base-content/70 mt-2" aria-label={`Subtotal: ${formatPrice(itemSubtotal)}`}>
                    Subtotal: {formatPrice(itemSubtotal)}
                </div>
            </div>
        </article>
    )
}

export default CartItem
