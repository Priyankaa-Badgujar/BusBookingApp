import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import { useEffect } from 'react'
import './book.css'

const Book = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const[data,setData]=useState({
    // id:id,
    name:'',
    wpnumber:'',
    contactnumber:'',
    msg:'',
    seatname:''
  })

 useEffect(() => {
  if (id) {
    const fetchupdate = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get/${id}`)
        const seatdata = res.data

        setData((prev) => ({
          ...prev,
          seatname: seatdata.seatname || '',
        }))
      } catch (err) {
        console.log('Error fetching seat data:', err)
      }
    }
    fetchupdate()
  }
}, [id])


  const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    console.log(data,id);
    if(id){
       const res1 = await axios.post(`http://localhost:5000/api/update/${id}`,data,{
      headers:{
        'Content-Type':'application/json'
      }
    },)

    const res2 = await axios.post(`http://localhost:5000/api/bookSeat`,data,{
      headers:{
        'Content-Type':'application/json'
      }
    })

    alert("your seeat is succusfully booked")
    navigate('/seat')
    }

    setData(
      {
    name:'',
    wpnumber:'',
    contactnumber:'',
    msg:'',
    seatname:''
      }
    )

  }

  
  return (
    <div className='bookclass'>
        <h1 style={{color:'white'}}>Fill all the details</h1>
      <form className='bookform' onSubmit={handleSubmit}>
        <label style={{ fontWeight: "bold" }}>You have select seat no: <b style={{color:'red'}}>{data.seatname}</b></label><br/><br/>
        <input type="text" placeholder='Your name' value={data.name} name='name' onChange={handleChange}/><br/><br/>
        <input type="text" name="wpnumber" value={data.wpnumber} onChange={handleChange}  placeholder='Your whatsapp number' /><br/><br/>
        <input type="text" name="contactnumber" value={data.contactnumber} onChange={handleChange}  placeholder='Your contact number'/><br/><br/>
        <input type="text" name="msg" onChange={handleChange} value={data.msg} placeholder='Additional msg' style={{height:'100px'}}/><br/><br/>
       
        <div style={{display:'flex',justifyContent:'space-between'}}>
          <button type='submit'>Submit</button>
          <Link to='/seat'><button type='submit'>Back</button></Link>
        </div>
      </form>
    </div>
  )
}

export default Book
