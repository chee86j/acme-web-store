import { MenuIcon } from "lucide-react"
import React from "react"
import { useSelector } from "react-redux"
import { Link, Outlet, NavLink } from "react-router-dom"

const AdminPage = () => {
  const { auth } = useSelector((state) => state)

  if (!auth.isAdmin) {
    return (<div className="drawer-content flex flex-col items-center ">
      <h1>Not Authorized</h1>
    </div>)
  }
  return (
    <div className="bg-base-100">
      <div className="drawer md:drawer-open">
        <input id="adminSidebar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Page content here */}
          <Outlet />
          <div className="stats shadow">

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-title">Fake Stats</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <div className="stat-title">We didnt get this far</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </div>
              <div className="stat-value">86%</div>
              <div className="stat-title">Tasks done</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>

          </div>
          <label
            htmlFor="adminSidebar"
            className="drawer-button btn-outline btn md:hidden fixed bottom-4 right-4"
          >
            <MenuIcon size={24} />
          </label>
        </div>
        <div className="drawer-side   z-50">
          <label htmlFor="adminSidebar" className="drawer-overlay "></label>
          <ul className="menu h-full w-40 bg-base-300 p-4 text-base-content ">
            {/* Sidebar content here */}
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
