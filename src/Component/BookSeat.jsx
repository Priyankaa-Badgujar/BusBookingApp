import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookSeat = () => {
  const [saved, setSaved] = useState([]);

  const [data, setData] = useState({
    seatname: '',
    status: false,
    color:'gray'
  });

  // ✅ Load saved seats from localStorage on first render
  useEffect(() => {
    const storedSeats = JSON.parse(localStorage.getItem("seatss")) || [];
    setSaved(storedSeats);
  }, []);

  // ✅ Update localStorage whenever `saved` state changes
  useEffect(() => {
    localStorage.setItem("seatss", JSON.stringify(saved));
  }, [saved]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    setData({ ...data, status: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Duplicate check from saved list
    const isDuplicate = saved.some(seat => seat.seatname === data.seatname);

    if (isDuplicate) {
      alert("❌ Seat already exists!");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/seatCreate`, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // ✅ Add new seat to state & localStorage
      setSaved([...saved, data]);
      alert("✅ Seat added successfully!");

      // Reset form
      setData({
        seatname: '',
        status: false,
        color:'gray'
      });

    } catch (error) {
      console.error("Error adding seat:", error);
    }
  };

  return (
    <div>
      <h2>Add Seat Details</h2><br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="seatname"
          value={data.seatname}
          onChange={handleChange}
          placeholder="Seat Name"
          required
        /><br /><br />

        <label>
          <input
            type="checkbox"
            name="status"
            checked={data.status}
            onChange={handleCheckbox}
          /> Available
        </label><br /><br />

        <input type='text' name='color' value={data.color} onChange={handleChange}/>
        <button type="submit">Add Seat</button>
      </form>

      <hr />

      <h3>Saved Seats:</h3>
      <ul>
        {saved.map((seat, index) => (
          <li key={index}>
            {seat.seatname} - {seat.status ? "Available ✅" : "Booked ❌"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookSeat;
