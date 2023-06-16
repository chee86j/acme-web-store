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
      <div className="flex flex-col md:flex-row">

        {user && <AccountForm user={user} />}
        <button className="btn-error btn self-start m-9" onClick={() => handleLogout()}>
          logout
        </button>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default Account