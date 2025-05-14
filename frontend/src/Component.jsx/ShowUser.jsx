import React, { useEffect, useState } from 'react'
import axios from "axios"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';
export default function ShowUser() {
    let [user,setUser] = useState([]);
    let [loggedin,setLoggedIn] = useState(null)
    let nav = useNavigate();
    useEffect(() => {

        loggedin = JSON.parse(localStorage.getItem("UserInfo"));
        setLoggedIn(loggedin)
        if (!loggedin) {
          toast.error("Login First");
          nav("/login")
          return;
        }





      axios.get("http://localhost:3001/gym/user").
      then((a)=>{
        console.log(a)
        setUser(a.data)
      }).catch((e)=>{
        console.log(e)
      })
     
    }, [])
    

    async function delete_user(id){
      try {
        if (window.confirm("Are You sure you want to delete this record?")) {
            axios.delete(`http://localhost:3001/gym/user/${id}`).then(()=>{
              setUser(a=>a.filter((b)=>b._id !== id))
              toast.success("Record Deleted Successfully")
            }).catch((e)=>{
              console.log(e)
            })
        }
      } catch (error) {
        toast.error(error.response?.data.msg)
      }
     
    }

    function logout(){
      localStorage.removeItem("UserInfo");
      nav("/login");
    }
  return (
    <div className='container'>
      <h2>Users {loggedin?.email}</h2>
      <button className='btn btn-warning' onClick={logout}>Logout</button>
      <hr />
      <div className="row">
        {
            user.map((a)=>(
                <div className="mt-3 col-md-4">
                    <div class="card" key={a.id}>                  
                        <div class="card-body">
                            <h4 class="card-title">{a.name}</h4>
                            <p class="card-text">{a.email}</p>
                            <p class="card-text">{a.gender}</p>
                            <button className="btn btn-danger" onClick={()=>{console.log(a._id); delete_user(a._id)}}>Delete</button>
                        </div>
                    </div>
                    
                </div>
            ))
        }
        <ToastContainer />
      </div>
    </div>
  )
}
