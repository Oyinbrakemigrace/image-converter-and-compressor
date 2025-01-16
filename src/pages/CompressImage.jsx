import React, { useState } from 'react'
import thumbnail from "../assets/thumbnail.svg"

const CompressImage = () => {
    const [image, setImage] = useState(null)

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)

            return () => URL.revokeObjectURL(imageUrl)
        }
    }

    //console.log(image);

    return (
        <div className='mx-20'>
            <h1 className='text-zinc-200 font-bold lg:text-5xl text-2xl text-center pt-10'>Compress Image</h1>
            <div className='text-zinc-200 mt-10'>
                <div className='flex lg:flex-row flex-col-reverse gap-10 justify-evenly items-center'>
                    <input type="file" onChange={handleImageChange} />
                    <div className='border h-[20rem] w-[20rem] border-zinc-200'>
                        {
                            image ? <img src={image} alt="thumbnail" className='w-full h-full object-contain' /> :
                                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-contain' />
                        }

                    </div>
                </div>
                <button className='mt-10 m-auto block px-10 py-3 rounded-lg bg-green-700 hover:bg-green-800' >Compress Image</button>
            </div>
        </div>
    )
}

export default CompressImage