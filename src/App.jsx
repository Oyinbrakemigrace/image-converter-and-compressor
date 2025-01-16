import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ConvertImage from './pages/ConvertImage'
import CompressImage from './pages/CompressImage'
import PdfToDoc from './pages/PdfToDoc'
import DocToPdf from './pages/DocToPdf'

const App = () => {
  return (
    <div className='bg-zinc-800 min-h-screen'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/convert-image' element={<ConvertImage />} />
          <Route path='/compress-image' element={<CompressImage />} />
          <Route path='/pdf-to-doc' element={<PdfToDoc />} />
          <Route path='/doc-to-pdf' element={<DocToPdf />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App