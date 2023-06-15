import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link, NavLink } from "react-router-dom"
import { logout } from "../store/auth"
import CartDropdown from "./CartDropdown"
import { cartQuantity } from "../util"
import { fetchGuestCart, fetchUserCart } from "../store"
import { ScrollTextIcon } from "lucide-react"

function Navbar({ auth }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = () => {
    navigate("/login")
  }

  const { cart } = useSelector((state) => state)

  const cartDisplayQuantity = cartQuantity(cart.cartItems ? cart.cartItems : [])

  return (
    <div className="navbar sticky top-0 z-20 bg-base-200">
      <div className="flex-1">
        <NavLink
          to={"/"}
          className={({ isActive, isPending }) =>
            `btn-xs md:btn-md text-md btn-ghost btn normal-case ${isActive ? "btn-active" : ""}`
          }
        >
          Home
        </NavLink>
        {auth.isAdmin && (
          <NavLink
            to={"/admin/products"}
            className={({ isActive, isPending }) =>
              `text-md btn-ghost btn-xs btn normal-case md:btn-md ${
                isActive ? "btn-active" : ""
              }`
            }
          >
            Admin
          </NavLink>
        )}
        <NavLink
          to={"/products"}
          className={({ isActive, isPending }) =>
            `text-md btn-ghost btn-xs btn normal-case md:btn-md ${
              isActive ? "btn-active" : ""
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to={"/orders"}
          className={({ isActive, isPending }) =>
            `text-md btn-ghost btn-xs btn normal-case md:btn-md ${
              isActive ? "btn-active" : ""
            }`
          }
        >
          Orders
        </NavLink>
      </div>
      {auth.id && (
        <div className="btn btn-ghost btn-circle mx-2" onClick={() => navigate("/account/wishlist")}>
          <ScrollTextIcon size={24} />
        </div>
      )}

      <div className="flex-none">
        {
          <div className="dropdown-end dropdown  mx-2">
            <label tabIndex={0} className="btn-ghost btn-circle btn">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {/* CART TOTAL ITEMS */}
                <span className="badge badge-sm indicator-item">
                  {cartDisplayQuantity}
                </span>
              </div>
            </label>
            {/* CART DROP DOWN */}
            <CartDropdown />
          </div>
        }
        {/* USER DROP DOWN */}
        {auth.id ? (
          <>
            {auth.avatar ? (
              <img
                src={auth.avatar}
                className="avatar h-8 w-8 cursor-pointer rounded-full hover:scale-110 md:h-10 md:w-10 mx-2"
                onClick={() => navigate("/account")}
              />
            ) : (
              <Link to="/account">
                  <span className="px-3">Account</span>
              </Link>
            )}
          </>
        ) : (
          <button
            className="btn-secondary btn-xs btn mr-2 md:btn-sm"
            onClick={() => handleLogin()}
          >
            Login | Sign Up
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar
