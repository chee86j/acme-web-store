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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-3d text-4xl sm:text-6xl md:text-8xl text-secondary text-center mb-8">
        Reviews
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {reviews.slice(0, 6).map((review) => (
          <div 
            key={review.id || uuidv4()} 
            className="card glass backdrop-blur hover:shadow-lg transition-shadow"
          >
            <div className="card-body p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-10">
                    <span className="text-lg">{review.user.username.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold capitalize">
                    {review.user.username}
                  </h2>
                  <Link 
                    to={`/products/${review.product.id}`}
                    className="text-sm sm:text-base text-primary hover:underline line-clamp-1"
                  >
                    {review.product.name}
                  </Link>
                </div>
              </div>
              
              <div className="relative">
                <span className="absolute top-0 left-0 text-4xl text-primary/20">"</span>
                <blockquote className="pl-6 pr-4 py-2 text-sm sm:text-base italic">
                  {review.description}
                </blockquote>
                <span className="absolute bottom-0 right-0 text-4xl text-primary/20">"</span>
              </div>
              
              <div className="mt-3">
                <Rating rating={review.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePageReviews
