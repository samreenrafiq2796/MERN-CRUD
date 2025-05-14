import axios from 'axios';
import React, { useState } from 'react'

export default function ForgotPassword() {
  let [email, setEmail] = useState("")
async function email_reset(){
    try {
        const res = await axios.post('http://localhost:3001/gym/forgotpswd', { email }); // adjust backend URL if needed
        console.log("Email Sent")
    } catch (error) {
        console.log(error)
    
    }
}
  return (
    <div>
        <div class="container">

<h2>Join the Gym Team 💪</h2>

<label for="email">Email Address</label>
<input type="email" id="email" name="email" required className='form-control my-2' value={email}
  onChange={(e) => setEmail(e.target.value)} />
  <button className='btn btn-primary' onClick={email_reset}>Forgot Password</button>
  </div>
    </div>
  )
}
