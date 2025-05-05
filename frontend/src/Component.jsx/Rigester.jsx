import React, { useState } from 'react'
import '../stlye/Rigester.css'
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export default function Rigester() {

  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [pswd, setPswd] = useState("")
  let [gender, setGender] = useState("")
  let [age, setAge] = useState(0)

  function clear() {
    setName("");
    setEmail("");
    setGender("");
    setPswd("")
    setAge(0)
  }

  async function register_user(e) {
    e.preventDefault()
    let pswd_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
    let username_regex = /^[A-Za-z ]+$/


    try {
      if (!name || !email || !pswd || !gender || age <= 0) {
        toast.error("All Fields Are Required");
        return;
      }
      if (!pswd_regex.test(pswd)) {
        toast.error("Invalid Password, Password must contain 1 uppercase, 1 lower case , 1 digit and 1 special character");
        return;
      }
      if (!username_regex.test(name)) {
        toast.error("Username should only contain alphabet");
        return;
      }


      let userapi = await axios.post("http://localhost:3001/gym/user", {
        name: name,
        email: email,
        password: pswd,
        gender: gender,
        age: age
      })
      clear()
      toast.success(userapi.data.msg)

    } catch (error) {
      if (error.status === 409) {
        toast.error(error.response.data.msg)
      }
      console.log(error)
      toast.error(error.response.data.msg)
    }
  }
  return (
    <div>
      <div class="container">

        <h2>Join the Gym Team 💪</h2>

        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" required className='form-control my-2' value={name}
          onChange={(e) => setName(e.target.value)} />

        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required className='form-control my-2' value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <label for="password">Password</label>
        <input type="password" id="password" name="password" required className='form-control my-2' value={pswd}
          onChange={(e) => setPswd(e.target.value)} />

        <label>Gender</label>
        <div class="gender-options">
          <label><input type="radio" name="gender" value="male" required
            onChange={(e) => setGender(e.target.value)} checked={gender === "male"} /> Male</label>
          <label><input type="radio" name="gender" value="female"
            onChange={(e) => setGender(e.target.value)} checked={gender === "female"} /> Female</label>
          <label><input type="radio" name="gender" value="other"
            onChange={(e) => setGender(e.target.value)} checked={gender === "other"} /> Other</label>
        </div>

        <label for="age">Age</label>
        <input type="number" id="age" name="age" required min="13" className='form-control my-2' value={age}
          onChange={(e) => setAge(e.target.value)} />

        <button className='btn btn-primary' onClick={register_user}>Register Now</button>
        <ToastContainer />

      </div>
    </div>
  )
}
