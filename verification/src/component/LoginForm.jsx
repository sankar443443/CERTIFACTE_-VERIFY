import React from 'react'
import './LoginForm.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
export default function LoginForm() {

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const user = {
    userName: name,
    pass: password
  }
  const login = () => {
    axios.post ('http://localhost:2400/userverify', user)
    .then(res => {
      if(res.status === 200){
          window.alert("user found")
      }
    })
    console.log(user)
    console.log("clcikded");
  }
  // useEffect (()=>{
  // },[])
  return (
    <div className='bodybor'>
      <div className='sing'>
        <h3 className='sign1'>Login</h3>
      </div>

      <div class="col-auto">
        <label for="inputPassword2" class="visually-hidden">Username</label>
        <input type="text" class="form-control" id="inputPassword2" onChange={(e)=>setName(e.target.value)} placeholder="Username" />
      </div>
      <div class="col-auto">
        <label for="inputPassword3" class="visually-hidden">Username</label>
        <input type="password" class="form-control" id="inputPassword3" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
      </div>

      <button className='inputPassword4' onClick={login}>Login</button>
      {/* <img src="../backend/uploads/9875-Screenshot (1).png" alt="error" /> */}

    </div>

  )
}