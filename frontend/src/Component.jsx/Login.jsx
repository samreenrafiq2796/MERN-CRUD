import React, { useState } from 'react'
import '../stlye/Rigester.css'
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {Link, useNavigate} from "react-router-dom"
export default function Login() {

  let [email, setEmail] = useState("")
  let [pswd, setPswd] = useState("")
  let nav = useNavigate();

  function clear() {
    setEmail("");
    setPswd("")
  }

  async function register_user(e) {
    e.preventDefault()
    
    try {
      if (!email || !pswd) {
        toast.error("All Fields Are Required");
        return;
      }
     


      let userapi = await axios.post("http://localhost:3001/gym/login", {
        email: email,
        password: pswd,
        })
      clear()
      localStorage.setItem("UserInfo",JSON.stringify(userapi.data.user))
      toast.success(userapi.data.msg)
      nav("/get_user")

    } catch (error) {
      if (error.status === 409) {
        toast.error(error.response?.data.msg)
      }
      console.log(error)
      toast.error(error.response?.data.msg)
    }
  }
  return (
    <div>
      <div class="container">

        <h2>Join the Gym Team 💪</h2>

        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required className='form-control my-2' value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required className='form-control my-2' value={pswd}
          onChange={(e) => setPswd(e.target.value)} />

      
        <button className='btn btn-primary' onClick={register_user}>Login Now</button>
        <Link to="/fp">Forgot Password</Link>
        <ToastContainer />

      </div>
    </div>
  )
}
