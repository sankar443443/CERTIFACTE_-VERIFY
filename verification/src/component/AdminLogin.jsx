import React, { useState } from 'react'
import axios from 'axios';
import './AdminLogin.css';


export default function AdminLogin() {




  return (
    <div className='back'>
      <span className='borderLine'></span>
      <div className='box'>
        <form action="">
          <h2 className='admin'>ADMIN LOGIN</h2> <br />
          <b>  <input type="text" name="" placeholder='UserName' id="loginput" /> </b> <br />
          <br />
          <b><input type="password" name="" placeholder='Password' id="loginput" /> </b>  <br />
          <br />
          <br />

          <input type="button" className='loginadmin' value="LOGIN" />
        </form>
      </div>
    </div>

  )
}
