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
    <div className="m-8 flex justify-start overflow-x-auto">
      {popularProducts.map((product) => {
        return (
          <div
            className="card glass card-compact m-4 w-[500px] -skew-y-2"
            key={uuidv4()}
          >
            <figure className="min-h-12 w-[300px]">
              <img
                src={product.imageURL}
                alt={product.name}
                className="mask-square aspect-square h-full w-full"
              />
            </figure>
            <div className="card-body p-2">
              <Link to={`/products/${product.id}`}>
                <h2 className="text-md min-h-full text-black hover:text-base-200">
                  {product.name}
                </h2>
              </Link>
            </div>
            <div className="card-actions flex flex-col">
              <div className="flex w-full flex-row">
                <div className="flex-none px-2">
                  <Rating rating={getAverageRating(product.reviews)} />
                </div>
                <div className="grow"></div>
                <div className="flex-none px-2">
                  <span className="badge badge-ghost">
                    <span className="text-lg font-bold">$</span>
                    <span className="font-bold">{product.price}</span>
                  </span>
                </div>
              </div>
              <div className="flex w-full flex-row items-center justify-center p-3">
                <WishListButton product={product} />
                <AddToCartButton product={product} quantity={1} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HomeProducts
