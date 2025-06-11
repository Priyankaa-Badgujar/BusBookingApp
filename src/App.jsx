import React from 'react'
import BookSeat from './Component/BookSeat'
import Seat from './Component/Seat/Seat'
import Book from './Component/booking/Book'
import { Route, Routes } from 'react-router'
import Login from './Component/login/Login'
import Register from './Component/register/Register'


const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/createseatbus' element={<BookSeat/>}/>
      <Route path='/seat' element={<Seat/>}/>
      <Route path='/:id' element={<Book/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Login/>}/>
     </Routes>
    </div>
  )
}

export default App
