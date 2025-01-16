import React, { useState } from 'react'
import thumbnail from "../assets/thumbnail.svg"
import jsPDF from 'jspdf';
import { ClipLoader } from 'react-spinners';

const ConvertImage = () => {
    const [image, setImage] = useState(null) //image state
    const [loading, setLoading] = useState(false) //loading state

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            const validTypes = ['image/jpeg', 'image/png'];
            if (validTypes.includes(file.type)) {
                const imageUrl = URL.createObjectURL(file); // Convert the file to a URL
                setImage(imageUrl);
                // Clean up the object URL when the component unmounts or new file is selected
                return () => URL.revokeObjectURL(imageUrl);
            } else {
                alert('Unsupported file type. Please upload a JPEG or PNG image.');
            }
        }
    };

    const handleDownloadpdf = async () => {
        if (image) {
            setLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));  //a delay to ensure the spinner is visible for better UX
                const pdf = new jsPDF();
                pdf.addImage(image, 'JPEG', 10, 10, 190, 160);
                pdf.save('image.pdf');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('An error occurred while generating the PDF.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please upload an image first');
        }
    };

    return (
        <div className='mx-20'>
            <h1 className='text-zinc-200 font-bold lg:text-5xl text-xl text-center pt-10'>Convert Image to PDF</h1>
            <div className='text-zinc-200 mt-10'>
                <div className='flex lg:flex-row flex-col-reverse gap-10 justify-evenly items-center'>
                    <input type="file" onChange={handleImageChange} accept="image/jpeg,image/png" />
                    <div className='border h-[20rem] w-[20rem] border-zinc-200'>
                        {
                            image ?
                                <img src={image} alt="selectedImage" className='w-full h-full object-contain' /> :
                                <img src={thumbnail} alt="thumbnail" className='w-full h-full object-contain' />
                        }
                    </div>
                </div>
                {
                    loading ? <div className='mt-16'>
                        <div className='flex items-center justify-center space-x-2'>
                            <span className='text-2xl text-rose-500'>Generating PDF</span>
                            <ClipLoader size={25} color='#f43f5e ' />
                        </div>
                    </div> 
                    :
                        <button
                            disabled={loading}
                            onClick={handleDownloadpdf}
                            className='mt-10 m-auto block px-10 py-3 rounded-lg bg-rose-800 hover:bg-rose-900' >
                            Download PDF
                        </button>
                }
            </div>
        </div>
    )
}

export default ConvertImage