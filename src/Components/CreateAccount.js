import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { attemptLogin } from "../store";
import { useNavigate } from "react-router-dom";
import { emailValidator, passwordValidator, usernameValidator } from "../util";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {setIsValidUsername(usernameValidator(username))}, [username]);
  useEffect(() => {setIsValidPassword(passwordValidator(password))}, [password])
  useEffect(() => {setIsValidEmail(emailValidator(email))}, [email])

  const create = async (event) => {
    try{
      event.preventDefault();
      const newUser = {username, password, email}
      const response = await axios.post("/api/account/create", newUser);
      dispatch(attemptLogin({username,password}));
      navigate('/')
    }catch(error){
      if(error.response.status === 403){
        window.alert(error.response.data);
      }else{
        throw error;
      }
    }
  }

  return (
    <div className="shadow-2x m-auto mb-4 mt-4 flex w-1/2 justify-center rounded-xl border-2 border-secondary bg-base-200">
      <div className="card ">
        <form className="flex flex-col justify-center" onSubmit={create}>
          <h3>Username</h3>
          <input
            className={
              isValidUsername
                ? "input-bordered input-primary input m-1 border-2 bg-neutral text-black"
                : "input-bordered input-warning input m-1 border-2 bg-neutral text-black "
            }
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <p
            className={
              isValidUsername
                ? "invisible text-xs"
                : "visible text-xs text-error"
            }
          >
            must be 8-30 characters long and no special chacters
          </p>
          <h3>Password</h3>
          <input
            className={
              isValidPassword
                ? "input-bordered input-primary input m-1 border-2 bg-neutral text-black"
                : "input-bordered input-warning input m-1 border-2 bg-neutral text-black"
            }
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p
            className={
              isValidPassword
                ? "invisible text-xs"
                : "visible text-xs text-error"
            }
          >
            must be 8-15 characters long and no special chacters
          </p>
          <h3>Email</h3>
          <input
            className={
              isValidEmail
                ? "input-bordered input-primary input m-1 border-2 bg-neutral text-black"
                : "input-bordered input-warning input m-1 border-2 bg-neutral text-black"
            }
            placeholder="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <p
            className={
              isValidEmail
                ? "invisible text-xs"
                : "visible text-xs text-error"
            }
          >
            must be a valid email address
          </p>
          <button
            disabled={!isValidEmail || !isValidPassword || !isValidUsername}
            className="btn-primary btn m-1"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAccount;