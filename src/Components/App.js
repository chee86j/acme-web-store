import React, { useEffect } from "react"
import Home from "./Home"
import Login from "./Login"
import Cart from "./Cart"
import Products from "./Products"
import CreateAccount from "./CreateAccount"
import NotFound from "./NotFound"
import SingleProductView from "./SingleProductView"
import { useSelector, useDispatch } from "react-redux"
import { loginWithToken, fetchGuestCart, fetchUserCart, fetchProducts, getWishlist } from "../store"
import { Link, Routes, Route } from "react-router-dom"
import Navbar from "./Navbar"
import Account from "./Account"
import Landing from "./Landing"
import Footer from "./Footer"
import AdminPage from "./pages/AdminPage"
import AdminUserPage from "./pages/AdminUserPage"
import AdminProductPage from "./pages/AdminProductPage"
import AdminOrdersPage from "./pages/AdminOrdersPage"
import AdminReviewsPage from "./pages/AdminReviewsPage"
import { ToastProvider } from "./ui/ToastProvider"
import { useToast } from "../hooks/useToast"
import CheckoutPage from "./pages/CheckoutPage"
import Orders from "./pages/OrdersPage"
import OrderVerifyPage from "./pages/OrderVerifyPage"
import WishlistPage from "./pages/WishlistPage"

const App = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  const { toasts } = useToast()
  useEffect(() => {
    dispatch(loginWithToken())
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUserCart())
      dispatch(getWishlist(auth.id))
    } else {
      dispatch(fetchGuestCart())
    }
  }, [auth])
  return (
    <div className="flex flex-col h-screen">
      <Navbar auth={auth} />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account/create" element={<CreateAccount />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          </Route>
          <Route path="/products/:id" element={<SingleProductView />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/verify" element={<OrderVerifyPage />} />
          <Route path="/orders/create" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <ToastProvider toasts={toasts} />
      <Footer />
    </div>
  )
}

export default App
