import React, { useState, useEffect } from "react"
import { attemptLogin } from "../store"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

const Login = () => {
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (auth.id) {
      navigate("/products")
    }
  }, [auth.id, navigate])

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value })
    setError("") // Clear error when user types
  }

  const login = async (ev) => {
    ev.preventDefault()
    try {
      const result = await dispatch(attemptLogin(credentials)).unwrap()
      if (!result) {
        setError("Login failed. Please check your credentials.")
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="m-auto mb-4 mt-4 flex w-1/2 justify-center rounded-xl border-2 border-secondary bg-base-200 shadow-2xl">
      <div className="card ">
        <h2 className="mb-2 mt-2 text-3xl">Login</h2>
        {error && <div className="text-error mb-2">{error}</div>}
        <form onSubmit={login} className="form-control ">
          <input
            placeholder="username"
            value={credentials.username}
            name="username"
            onChange={onChange}
            className={
              credentials.username.length > 0
                ? "border-2 input-bordered input-primary input m-1 bg-neutral text-black"
                : "border-2 input-bordered input-warning input m-1 bg-neutral text-black"
            }
          />
          <input
            placeholder="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={onChange}
            className={
              credentials.password.length > 0
                ? "border-2 input-bordered input-primary input m-1 bg-neutral text-black"
                : "border-2 input-bordered input-warning input m-1 bg-neutral text-black"
            }
          />
          <button className="btn-primary btn">Login</button>
        </form>
        <Link to="/account/create" className="mb-2">
          No Account? Sign Up Here
        </Link>
      </div>
    </div>
  )
}

export default Login
