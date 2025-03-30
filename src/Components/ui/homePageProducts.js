import React, { useState, useEffect, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { getAverageRating } from "../../util"
import AddToCartButton from "../AddToCartButton"
import WishListButton from "./WishListButton"
import { useDispatch, useSelector } from "react-redux"

const HomeProducts = () => {
  const { products, reviews } = useSelector((state) => state)
  const [popularProducts, setPopularProducts] = useState([])

  useEffect(() => {
    if (Array.isArray(products.products)) {
      setPopularProducts(products.products.slice(0, 24))
    } else {
      setPopularProducts([])
    }
  }, [products])

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">Popular Products</h2>
      
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {popularProducts.map((product) => (
          <div
            className="card glass hover:shadow-xl transition-shadow duration-200 shrink-0 w-[280px] sm:w-[320px] snap-start"
            key={uuidv4()}
          >
            <figure className="relative pt-[100%]">
              <img
                src={product.imageURL}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            
            <div className="card-body p-4">
              <Link 
                to={`/products/${product.id}`}
                className="hover:text-primary transition-colors"
              >
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h3>
              </Link>

              <div className="mt-auto space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Rating rating={getAverageRating(product.reviews)} />
                  <div className="badge badge-ghost gap-1">
                    <span className="text-sm font-semibold">$</span>
                    <span className="font-semibold">{product.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between gap-2 pt-2">
                  <WishListButton product={product} />
                  <AddToCartButton product={product} quantity={1} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeProducts
