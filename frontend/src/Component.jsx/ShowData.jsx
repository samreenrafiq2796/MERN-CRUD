import React, { act, useEffect, useState } from 'react'
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
export default function ShowData() {
  let [user, setUser] = useState([]);
  let [name, setName] = useState("")
  let [email, setEmail] = useState("")
  let [gender, setGender] = useState("")
  let [id, setId] = useState("")
  let [age, setAge] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:3001/gym/user").
      then((a) => {
        console.log(a)
        setUser(a.data)
      }).catch((e) => {
        console.log(e)
      })

  }, [])

  async function delete_user(id) {
    try {
      if (window.confirm("Are You sure you want to delete this record?")) {
        axios.delete(`http://localhost:3001/gym/user/${id}`).then(() => {
          setUser(a => a.filter((b) => b._id !== id))
          toast.success("Record Deleted Successfully")
        }).catch((e) => {
          console.log(e)
        })
      }
    } catch (error) {
      toast.error(error.response?.data.msg)
    }

  }

  function fetch_data(a, b, d, e,f) {
    setName(a)
    setEmail(b)
    setAge(d)
    setGender(e)
    setId(f)
  }

  async function update_record(){
    try {
      await axios.put(`http://localhost:3001/gym/user/${id}`,{
      name:name,
      email:email,
      age:age,
      gender:gender
    }).then(()=>{
      setUser((p)=>p.map(a=>a._id===id?{...a,name,email,age,gender}:a))
      toast.success("Record Updated Successfully")
      document.querySelector(".close").click();
    })
    } catch (error) {
      toast.error(error.response?.data.msg)
    }
  }
  return (
    <div className='container'>
      <h2>Users</h2>
      <hr />
      <div className="row">
        {
          user.map((a) => (
            <div className="mt-3 col-md-4">
              <div class="card" key={a.id}>
                <div class="card-body">
                  <h4 class="card-title">{a.name}</h4>
                  <p class="card-text">{a.email}</p>
                  <p class="card-text">{a.gender}</p>
                  <button className="btn btn-danger" onClick={() => { console.log(a._id); delete_user(a._id) }}>Delete</button>
                  <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => fetch_data(a.name, a.email, a.age, a.gender,a._id)}>Update</button>
                </div>
              </div>

            </div>
          ))
        }


        <ToastContainer />
      </div>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Record</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <input type="text" className="form-control mt-2" value={name} onChange={(e) => setName(e.target.value)} />
              <input type="email" className="form-control mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="number" className="form-control mt-2" value={age} onChange={(e) => setAge(e.target.value)} />
              <p>Select Gender</p>
              <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} />&nbsp;Male&nbsp;
              <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} />&nbsp;Female&nbsp;
              <input type="radio" name="gender" value="other" onChange={(e) => setGender(e.target.value)} checked={gender === 'other'} />&nbsp;Other&nbsp;
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary close" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={update_record}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}