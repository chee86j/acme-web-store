import React, { useState, useEffect, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import { getAverageRating } from "../../util"
import AddToCartButton from "../AddToCartButton"
import WishListButton from "./WishListButton"
import { useDispatch, useSelector } from "react-redux"
import { fetchReviews } from "../../store"

const HomePageReviews = () => {
  const { reviews } = useSelector((state) => state.reviews)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReviews())
  }, [])

  console.log(reviews)
  // m-auto mb-2 mt-2 flex w-10/12 justify-center text-center
  return (
    <div className="flex flex-col items-center ">
      <div className="font-3d text-9xl text-secondary">Reviews</div>
      {reviews.slice(0, 6).map((review) => {
        return (
          <div className="m-auto mb-2 mt-2 flex w-10/12 justify-center text-left">
            <div className="glass mx-4 my-3 max-w-xl rounded-lg p-4 backdrop-blur">
              <h2 className="mb-2 text-4xl font-bold capitalize">
                {review.user.username}
              </h2>
              <div className="mx-6 text-2xl"><Link to={`/products/${review.product.id}`}>{review.product.name}</Link></div>
              <div className="mx-10 font-sans text-xl italic">
                "{review.description}"!
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default HomePageReviews
