import React from "react"
import { useCart } from "../hooks/useCart"

const AddToCartButton = ({ product, quantity = 1 }) => {
    const { addItem } = useCart();

    const handleAddToCart = async () => {
        await addItem(product, quantity);
    }
    
    return (
        <div className="flex w-full flex-row-reverse p-2">
            <button
                onClick={handleAddToCart}
                className="btn-secondary btn-sm btn text-base-300"
            >
                Add to Cart
            </button>
        </div>
    )
}

export default AddToCartButton
