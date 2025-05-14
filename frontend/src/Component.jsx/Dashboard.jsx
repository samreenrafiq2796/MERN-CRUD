import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    let [email , setEmail] = useState("")
    useEffect(() => {
      let user = localStorage.getItem("UserInfo");
        if (user) {
            let us = JSON.parse(user)
            setEmail(us.email)
            
        }

      
    }, [])
    
  return (
    <div>
      <h1>Welcome {email}</h1>
    </div>
  )
}
