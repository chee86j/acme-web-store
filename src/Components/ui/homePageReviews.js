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
  const {reviews} = useSelector((state) => state.reviews)

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchReviews())
  },[])

  console.log(reviews)

  return (
    <div className="flex flex-col items-center">
      <div className="font-3d text-9xl text-secondary">
        Reviews
      </div>
      {reviews.slice(0, 6).map((review) => {
        return (
          <div className="glass m-4 w-[1500px] rounded-lg p-4 backdrop-blur">
            <h2 className="text-4xl">{review.user.username}</h2>
            <div className="text-2xl">{review.product.name}</div>
            <div>{review.description}</div>
          </div>
        )
      })}
    </div>
  )
}
export default HomePageReviews