import React, { useState } from 'react'
import axios from 'axios'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
    const [data,setData]=useState({username:"",email:"",password:""})
    const navigate = useNavigate()

    const handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/register`,data,{
          headers:{
            'Content-Type':'application/json'
          }
        })
        alert("registered succussfully")
        navigate('/')
        setData({
          username:'',
          email:'',
          password:''
        })
    }

  return (
   <div className='registerdiv'>
     <div className='registerform'>
    <h1 style={{fontFamily:'emoji',paddingTop:'80px'}}>Please Create Account</h1>
     <form onSubmit={handleSubmit}>
      <input type="text"  name='username' placeholder="Username" onChange={handleChange} required value={data.username} /><br/><br/>
      <input type="email" name='email' placeholder="Email" onChange={handleChange}  required value={data.email} /><br/><br/>
      <input type="password" name='password' placeholder="Password"  onChange={handleChange} required value={data.password}/><br/><br/>
      <div className='btn-btn'>
        <button type="submit" className="submit-btn">Sign Up</button>
        <Link to='/'><button type="button" className="buttonback"> Back</button></Link>
      </div>
    </form>
    </div>
   </div>
  )
}

export default Register
