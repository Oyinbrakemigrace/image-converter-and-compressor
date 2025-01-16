import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <p className='font-extrabold text-7xl text-zinc-200 font-sans'>I want to</p>
            <div className='grid md:grid-cols-2 mt-14 gap-6'>
                <Link to="/convert-image">
                    <button className='bg-rose-800 w-full lg:px-24 px-16 py-8 text-zinc-200 text-xl rounded-lg hover:bg-rose-900'>
                        Convert Image to PDF
                    </button>
                </Link>
                <Link to="/compress-image">
                    <button className='bg-green-700 w-full py-8 text-zinc-200 text-xl rounded-lg hover:bg-green-800'>
                        Compress Image
                    </button>
                </Link>
                <Link to="/pdf-to-doc">
                    <button className='bg-blue-700 w-full py-8 text-zinc-200 text-xl rounded-lg hover:bg-blue-800'>
                        Convert PDF to DOC
                    </button>
                </Link>
                <Link to="/doc-to-pdf">
                    <button className='bg-amber-700 w-full py-8 text-zinc-200 text-xl rounded-lg hover:bg-amber-800'>
                        Convert DOC to PDF
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home