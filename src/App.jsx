import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ConvertImage from './pages/ConvertImage'
import CompressImage from './pages/CompressImage'

const App = () => {
  return (
    <div className='bg-blue-950 min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/convert-image' element={<ConvertImage />} />
          <Route path='/compress-image' element={<CompressImage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App