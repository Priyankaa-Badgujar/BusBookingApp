import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './seat.css'

const Seat = () => {
  const [seats,setStatus]=useState([])
  const [color,setColor] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    fetchData()
  },[])

  
  const fetchData=async(e)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getSeat`)
    setStatus(res.data.seats)
    const colors = res.data.seats.map(seat => seat.color);
    setColor(colors);
    
  }


  return (
    <div className='seatdiv'>
      <h1 style={{fontFamily:'emoji',color:'white'}}>Book your seat</h1><br/>
      <div className='btn'>
           <button className='book-btn'>Booked</button>
           <button className='avail-btn'>Available</button></div><br/>
      <div style={{}} className='seatdiv1'>
       {
        <div className='seatdiv2'>
  {seats.slice(0,18).map((item, i) => (
    <div key={i}>
      {item.status === false ? (
        // 🔒 Booked seat (status false)
        <button
         className='seatbt1'
          onClick={() => alert("This seat is already booked")}
          disabled
          style={{
            backgroundColor: item.color,
          }}
        >
         Booked
        </button>
      ) : (
        // ✅ Available seat (status true)
        <Link to={`/${item._id}`}>
          <button
          className='seatbt1'
            style={{
              backgroundColor: item.color,
            }}
          >
            {item.seatname}
          </button>
        </Link>
      )}
    </div>
  ))}
</div>

       }

        {
        <div style={{ width: '200px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
  {seats.slice(18,36).map((item, i) => (
    <div key={i}>
      {item.status === false ? (
        // 🔒 Booked seat (status false)
        <button
         className='seatbt1'
          onClick={() => alert("This seat is already booked")}
          disabled
          style={{backgroundColor:item.color}}
        >
         Booked
        </button>
      ) : (
        // ✅ Available seat (status true)
        <Link to={`/${item._id}`}>
          <button
          className='seatbt1'
            style={{backgroundColor: item.color,}}
          >
            {item.seatname}
          </button>
        </Link>
      )}
    </div>
  ))}
</div>

       }

      </div>
    </div>
  );
};

export default Seat;
