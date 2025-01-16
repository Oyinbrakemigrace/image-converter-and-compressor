import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <p className='font-extrabold text-7xl text-zinc-200 font-sans'>I want to</p>
            <div className='flex lg:flex-row flex-col mt-14 lg:space-y-0 lg:space-x-6 space-y-6'>
                <Link to="/convert-image">
                    <button className='bg-rose-800 px-16 py-8 text-zinc-200 text-xl rounded-lg hover:bg-rose-900'>
                        Convert Image to PDF
                    </button>
                </Link>
                <Link to="/compress-image">
                    <button className='bg-green-700 px-[5.5rem] py-8 text-zinc-200 text-xl rounded-lg hover:bg-green-800'>
                        Compress Image
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Home