import React, { useState } from 'react'
import RemoveFromCartButton from './RemoveFromCartButton'
import { useDispatch, useSelector } from 'react-redux'
import { updateCartQuantity, updateGuestCartQuantity } from '../store'

const CartItem = ({ product }) => {
    const {auth} = useSelector(state => state);
    const [quantity, setQuantity] = useState(product.quantity)
    const dispatch = useDispatch()
    
    const handleQuantityIncrement = () => {
        if (auth.id) {
            const updatedCart = {
              product,
              quantity: parseInt(quantity) + 1,
            }
            dispatch(updateCartQuantity(updatedCart))
            setQuantity(quantity + 1)
        }else{
            dispatch(
              updateGuestCartQuantity({
                productId: product.product.id,
                quantity: quantity + 1,
              })
            )
            setQuantity(quantity + 1)
        }
    }
    const handleQuantityDecrement = () => {
        if (auth.id){
            const updatedCart = {
              product,
              quantity: parseInt(quantity) - 1,
            }
            dispatch(updateCartQuantity(updatedCart))
            setQuantity(quantity - 1)
        }else{
            dispatch(
              updateGuestCartQuantity({
                productId: product.product.id,
                quantity: quantity - 1,
              })
            )
            setQuantity(quantity - 1)
        }
    }
    return (
        <div className="card glass m-4 w-64 sm:card-normal card-compact">
            <div className="card-body p-2">
                <img src={product.product.imageURL} alt={product.product.name} className="mask-square aspect-square h-full w-full"/>
              <span>{product.product.name}</span>
              <span className= "badge badge-ghost">
                <span className="text-lg font-bold">$</span><span className="font-bold">{product.product.price}</span>
              </span>
              <button onClick={handleQuantityIncrement}>+</button>
              <span>
                {quantity}
                 
                {/* type="number"
                min={1}
                max={product.product.quantity}
                step="1"
                value={quantity}
                onChange={((event) => handleQuantityChange(event))} */}
            
              </span>
              <button onClick={handleQuantityDecrement}>-</button>
              <RemoveFromCartButton product={product} quantity={product.quantity}/>
            </div>
        </div>
    )
}

export default CartItem
