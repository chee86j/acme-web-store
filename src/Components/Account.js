import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { updateUser, fetchUser } from "../store/users";
import AccountForm from "./ui/AccountForm";

const Account = () => {
  const { user } = useSelector((state) => state.users);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (auth.id) {
      dispatch(fetchUser(auth.id))
    }
    else {
      navigate("/")
    }

  }, [auth.id])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/")
  }

  if (user && auth.id === user.id) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-6">
          {user && <AccountForm user={user} />}
          <button 
            className="btn btn-error w-full sm:w-auto self-center sm:self-start" 
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    )
  }
}

export default Account