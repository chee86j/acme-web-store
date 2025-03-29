import axios from 'axios';
import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteGuestCart, fetchUserCart, fetchProducts } from '../../store';
import { emailValidator } from '../../util';

const CheckoutPage = () => {

  const {auth,cart} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[street,setStreet] = useState("");
  const[city,setCity] = useState("");
  const[state,setState] = useState("");
  const[zip,setZip] = useState("");
  const[ccName, setCcName] = useState("");
  const[ccNumber,setCcNumber] = useState("");
  const[exp,setExp] = useState("");
  const[ccv,setCcv] = useState("");
  const[email, setEmail] = useState("");

  const[status, setStatus] = useState("pending");

  const[order, setOrder] = useState({data:{createdAt:""}});

  const submit = async (event) => {
    try {
      event.preventDefault()
      if(auth.id){
        const newOrder = {
          firstName,
          lastName,
          street,
          city,
          state,
          zip,
          userId: auth.id,
          email,
        }
        const token = window.localStorage.getItem("token")
        const response = await axios.post(
          "/api/orders",
          { data: newOrder },
          {
            headers: {
              authorization: token,
            },
          } 
        )
        setOrder(response)
        dispatch(fetchProducts())
        dispatch(fetchUserCart())
        setStatus("created")
      }else{
        const newOrder = {
          firstName,
          lastName,
          street,
          city,
          state,
          zip,
          email,
        }
        const response = await axios.post(
          "/api/orders",
          { data: {newOrder, cart}}
        )
        setOrder(response)
        dispatch(deleteGuestCart())
        dispatch(fetchProducts())
        setStatus("created")
      }
    } catch (error) {
      setStatus("error")
    }
  }

  const OrderCreated = ({props}) => {
    return(
      <div className="p-3 sm:p-4">
        <h1 className="bg-gradient-to-r from-success to-accent bg-clip-text text-5xl sm:text-7xl md:text-9xl font-extrabold text-transparent mb-4">
          Order Created
        </h1>
        <h2 className="text-lg sm:text-xl mb-2">
          Thank you {props.data.firstName} {props.data.lastName} for shopping with us.
        </h2>
        <h4 className="text-sm sm:text-base mb-1">Order Placed at: {props.data.createdAt}</h4>
        <h4 className="text-sm sm:text-base mb-1">shipping to:</h4>
        <h4 className="text-sm sm:text-base mb-1">{props.data.street}</h4>
        <h4 className="text-sm sm:text-base mb-3">
          {props.data.city}, {props.data.state} {props.data.zip}
        </h4>
        <h4 className="text-sm sm:text-base mb-4">Arriving in: 2 days</h4>
        <button
          className="btn btn-primary btn-sm sm:btn-md"
          onClick={() => {
            navigate("/orders")
          }}
        >
          Return to Account
        </button>
      </div>
    )
  }

  const OrderFailed = (
    <div className="p-3 sm:p-4">
      <h1 className="bg-gradient-to-r from-error to-warning bg-clip-text text-5xl sm:text-7xl md:text-9xl font-extrabold text-transparent mb-4">
        Order Failed
      </h1>
      <button
        className="btn btn-primary btn-sm sm:btn-md"
        onClick={() => {
          setStatus("pending")
        }}
      >
        Try Again
      </button>
    </div>
  )

  const form = (
    <div className="mx-auto my-2 sm:my-4 w-full sm:w-11/12 max-w-3xl px-3 sm:px-4 py-4 sm:py-6 rounded-xl border-2 border-secondary bg-base-200">
      <div className="flex flex-col justify-center">
        <h1 className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-4xl sm:text-6xl md:text-8xl font-extrabold text-transparent mb-6">
          Enter Details
        </h1>
        <form className="space-y-4" onSubmit={submit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm sm:text-base mb-1">First Name</h3>
              <input
                type="text"
                className={
                  firstName !== ""
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm sm:text-base mb-1">Last Name</h3>
              <input
                type="text"
                className={
                  lastName !== ""
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm sm:text-base mb-1">Email</h3>
            <input
              type="text"
              className={
                emailValidator(email)
                  ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                  : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
              }
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="w-full">
            <h3 className="text-sm sm:text-base mb-1">Street</h3>
            <input
              type="text"
              className={
                street !== ""
                  ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                  : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
              }
              value={street}
              onChange={(event) => setStreet(event.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm sm:text-base mb-1">City</h3>
              <input
                type="text"
                className={
                  city !== ""
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm sm:text-base mb-1">State</h3>
              <input
                type="text"
                className={
                  state !== ""
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/3">
              <h3 className="text-sm sm:text-base mb-1">Zip</h3>
              <input
                type="text"
                className={
                  zip.length === 5 || zip.length === 10
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-sm sm:text-base mb-1">Name on Card</h3>
            <input
              type="text"
              className={
               ccName !== ""
                  ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                  : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
              }
              autoComplete="cc-name"
              value={ccName}
              onChange={(event) => setCcName(event.target.value)}
            />
          </div>

          <div className="w-full">
            <h3 className="text-sm sm:text-base mb-1">CC Number</h3>
            <input
              type="text"
              className={
                ccNumber.length === 16
                  ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                  : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
              }
              autoComplete="cc-number"
              value={ccNumber}
              onChange={(event) => setCcNumber(event.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm sm:text-base mb-1">Exp.</h3>
              <input
                type="text"
                className={
                  exp !== ""
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                autoComplete="cc-exp"
                value={exp}
                onChange={(event) => setExp(event.target.value)}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <h3 className="text-sm sm:text-base mb-1">CVV</h3>
              <input
                type="text"
                className={
                  ccv.length === 3
                    ? "input-bordered input-primary input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                    : "input-bordered input-warning input input-sm sm:input-md w-full border-2 bg-neutral text-black"
                }
                autoComplete="cc-csc"
                value={ccv}
                onChange={(event) => setCcv(event.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              className="btn btn-primary btn-sm sm:btn-md w-full"
              disabled={
                firstName === "" ||
                lastName === "" ||
                street === "" ||
                ccName === "" ||
                !emailValidator(email) ||
                city === "" ||
                (zip.length !== 5 && zip.length !== 10) ||
                ccNumber.length !== 16 ||
                ccv.length !== 3 ||
                exp === "" ||
                state === ""
              }
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  if(status === "pending"){
    return form
  }else if(status === "created"){
    return (<OrderCreated props = {order}/>)
  }else{
    return OrderFailed
  }
}

export default CheckoutPage
