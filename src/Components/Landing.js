import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import HomeProducts from "./ui/homePageProducts"
import axios from "axios"
import { fetchReviews } from "../store"
import HomePageReviews from "./ui/homePageReviews"
import { useParallax } from "react-scroll-parallax"

const Landing = () => {
  const dispatch = useDispatch()
  const { ref } = useParallax({ speed: 50 })

  return (
    <div className="" ref={ref}>
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-8xl font-extrabold text-transparent">
          ACME Web Store
        </div>
      </div>
      <p className="m-auto mb-2 mt-2 flex w-10/12 justify-center text-center">
        About: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni
        aliquid, delectus, illum illo id atque libero deleniti enim eius
        perferendis et! Expedita excepturi perspiciatis similique ipsum amet
        totam nulla sapiente!
      </p>
      <div className="my-16 h-[600px] skew-y-2 bg-gradient-to-r from-primary to-secondary">
        <h1 className="mt-12 flex -skew-y-2 justify-center stroke-black text-4xl font-extrabold">
          Popular Products
        </h1>
        <HomeProducts />
      </div>
      <div>
        <HomePageReviews />
      </div>
    </div>
  )
}

export default Landing
