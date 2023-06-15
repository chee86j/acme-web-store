import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeWishlist, getWishlist } from '../../store'

function WishlistPage() {
    const { wishlist } = useSelector((state) => state.products)
    const { id } = useSelector((state) => state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRemove = (productId) => {
        dispatch(removeWishlist(productId))
    }
    useEffect(() => {
        dispatch(getWishlist(id))
    }, [])

    return (
        <div className="flex flex-col items-center">
            <h1>Wish List</h1>
            <table className="table p-3">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description | Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {wishlist.length > 0 &&
                        wishlist.map((product) => {
                            if (!product.product) return null
                            return (
                                <tr
                                    key={product.productId}
                                >
                                    <td>
                                        <div className="flex items-center space-x-3">

                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={product.product.imageURL}
                                                        alt={product.product.name}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <div className="font-bold">{product.product.name}</div>
                                                <div className="text-sm opacity-50">
                                                    {product.product.material}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="w-4 text-ellipsis">
                                            {product.product.description}
                                        </span>
                                        <br />
                                        <span className="badge badge-ghost badge-sm">
                                            {product.product.category}
                                        </span>
                                    </td>
                                    <td className="text-lg">${product.product.price}</td>
                                    <th>
                                        <div className="flex flex-row justify-evenly">

                                            <button
                                                className="btn-neutral btn-xs btn mx-1 px-1"
                                                onClick={() => {
                                                    navigate(`/products/${product.productId}`)
                                                }}

                                            >
                                                View
                                            </button>
                                            <button
                                                className="btn-error btn-xs btn mx-1 px-1"
                                                onClick={() => {
                                                    handleRemove(product.productId)
                                                }}

                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default WishlistPage