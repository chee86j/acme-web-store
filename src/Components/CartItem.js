import React, { useState } from 'react'
import RemoveFromCartButton from './RemoveFromCartButton'
import { useDispatch, useSelector } from 'react-redux'
import {
  removeFromCart,
  updateCartQuantity,
  updateGuestCartQuantity,
  removeFromGuestCart,
} from "../store"

const CartItem = ({ product }) => {
    const {auth} = useSelector(state => state);
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()
    
    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value) || 0
        
        if (newQuantity < 0) return
        
        setQuantity(newQuantity)
        
        if (newQuantity === 0) {
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
                quantity: newQuantity
            }))
        } else {
            dispatch(updateGuestCartQuantity({
                productId: product.product.id,
                quantity: newQuantity
            }))
        }
    }

    return (
        <div className="card w-64 glass m-4">
            <figure><img src={product.product.imageURL} alt={product.product.name}/></figure>
            <div className="card-body">
                <h1 className="truncate text-lg font-bold">{product.product.name}</h1>
                <div className="badge badge-ghost">
                    <span className="text-lg font-bold">$</span><span className="font-bold">{product.product.price}</span>
                </div>
                <div className="flex flex-row items-center justify-center">
                    <input
                        type="number"
                        min="0"
                        value={quantity}
                        onChange={handleQuantityChange}
                        className="input input-bordered input-sm w-20 text-center"
                    />
                </div>
                <div className="card-actions justify-end">
                    <RemoveFromCartButton product={product} quantity={product.quantity}/>
                </div>
            </div>
        </div>
    )
}

export default CartItem
