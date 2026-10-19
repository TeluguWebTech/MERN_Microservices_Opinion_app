import React from 'react'
import ShowTopics from './pages/ShowTopics'
import { Route, Routes } from 'react-router-dom'
import SingleTopic from './pages/SingleTopic'
import UserRegister from './components/UserRegister'
import UserLogin from './components/UserLogin'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<ShowTopics />} />
        <Route path='/single/topic/:id' element={<SingleTopic />} />
        <Route path='/user/register' element={<UserRegister />} />
        <Route path='/user/Login' element={<UserLogin />} />
      </Routes>
    </div>
  )
}

export default App