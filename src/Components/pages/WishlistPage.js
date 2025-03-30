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
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">My Wishlist</h1>
            
            {/* Desktop view */}
            <div className="hidden md:block">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Description | Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlist.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-8">
                                    <p className="text-base-content/70">Your wishlist is empty</p>
                                </td>
                            </tr>
                        ) : (
                            wishlist.map((product) => {
                                if (!product.product) return null;
                                return (
                                    <tr key={product.productId}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img
                                                            src={product.product.imageURL}
                                                            alt={product.product.name}
                                                            loading="lazy"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{product.product.name}</div>
                                                    <div className="text-sm opacity-50">{product.product.material}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="line-clamp-2 text-sm">{product.product.description}</div>
                                            <span className="badge badge-ghost badge-sm mt-1">
                                                {product.product.category}
                                            </span>
                                        </td>
                                        <td className="font-semibold">${product.product.price}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                <button
                                                    className="btn btn-neutral btn-sm"
                                                    onClick={() => navigate(`/products/${product.productId}`)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="btn btn-error btn-sm"
                                                    onClick={() => handleRemove(product.productId)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-4">
                {wishlist.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-base-content/70">Your wishlist is empty</p>
                    </div>
                ) : (
                    wishlist.map((product) => {
                        if (!product.product) return null;
                        return (
                            <div key={product.productId} className="card bg-base-200 shadow-lg">
                                <div className="card-body p-4">
                                    <div className="flex gap-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img
                                                    src={product.product.imageURL}
                                                    alt={product.product.name}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="card-title text-lg mb-1">{product.product.name}</h2>
                                            <p className="text-sm text-base-content/70 mb-1">{product.product.material}</p>
                                            <div className="line-clamp-2 text-sm mb-2">{product.product.description}</div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="badge badge-ghost">{product.product.category}</span>
                                                <span className="font-semibold">${product.product.price}</span>
                                            </div>
                                            <div className="card-actions justify-end pt-2 border-t border-base-300">
                                                <button
                                                    className="btn btn-neutral btn-sm"
                                                    onClick={() => navigate(`/products/${product.productId}`)}
                                                >
                                                    View Details
                                                </button>
                                                <button
                                                    className="btn btn-error btn-sm"
                                                    onClick={() => handleRemove(product.productId)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default WishlistPage