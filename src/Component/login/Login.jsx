import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import './login.css'


const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate()

    const handleChange=(e)=>{
      setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login`,data,{
        headers:{
          'Content-Type':'application/json'
        }
      })
      if(res.data.token){
        localStorage.setItem('token',res.data.token)
        alert("login successfull")
        navigate('/seat')
        setData({
          email:"",
          password:""
        })
        
      }else{
        alert("login failed")
        setData({
          email:"",
          password:""
        })
        
      }
    }

  return (
    <div className='loginform' >
      <form onSubmit={handleSubmit} autoComplete="off">
      <h1 style={{fontFamily:'emoji'}} className='loginh'>Please login</h1>
      <input type="text" autoComplete='off' placeholder="email" required className='hinput' name='email'   value={data.email}  onChange={handleChange}/><br/><br/>
      <input type="password" autoComplete='off' placeholder="Password" name='password' value={data.password} required  onChange={handleChange}/><br/><br/>
      <button type="submit" className="submit-btn">Login</button><br/><br/>
      <Link to={'/register'} className='link'><p style={{color:"black",textDecoration:'none',fontWeight:'bold'}}>Not have account! create account </p></Link>
    </form>
    </div>
  )
}

export default Login
