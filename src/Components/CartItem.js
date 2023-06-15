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
    const handleQuantityDecrement = async () => {
        if (auth.id){
            const updatedCart = {
              product,
              quantity: parseInt(quantity) - 1,
            }
            dispatch(updateCartQuantity(updatedCart))
            setQuantity(quantity - 1)
            if(quantity-1 === 0){
                dispatch(removeFromCart({product: product}))
            }
        }else{
            dispatch(
              updateGuestCartQuantity({
                productId: product.product.id,
                quantity: quantity - 1,
              })
            )
            setQuantity(quantity - 1)
            if (quantity-1 === 0) {
              dispatch(removeFromGuestCart({product: {product}}))
            }
        }
    }
    return (
        <div className="card w-64 glass m-4">
            <figure><img src={product.product.imageURL} alt={product.product.name}/></figure>
            <div className="card-body">
                <h1 className="truncate text-lg font-bold">{product.product.name}</h1>
                <div className= "badge badge-ghost">
                    <span className="text-lg font-bold">$</span><span className="font-bold">{product.product.price}</span>
                </div>
                <div className="flex flex-row items-center">
                    <button className="m-4 btn btn-circle btn-neutral" onClick={handleQuantityIncrement}>+</button>
                    <span>{quantity}</span>
                    <button className="m-4 btn btn-circle btn-neutral" onClick={handleQuantityDecrement}>-</button>
                </div>
                <div className="card-actions justify-end">
                    <RemoveFromCartButton product={product} quantity={product.quantity}/>
                </div>
            </div>
        </div>
    )
}

export default CartItem
