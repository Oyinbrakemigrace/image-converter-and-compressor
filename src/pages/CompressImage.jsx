import React, { useState } from 'react';
import thumbnail from '../assets/thumbnail.svg';
import { Link } from 'react-router-dom';

const CompressImage = () => {
    const [image, setImage] = useState(null); // Original image
    const [compressedImage, setCompressedImage] = useState(null); // Compressed image

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            // Clean up the object URL when the component unmounts or a new file is selected
            return () => URL.revokeObjectURL(imageUrl);
        }
    };

    const handleCompressImage = async () => {
        if (!image) {
            alert('Please upload an image first');
            return;
        }

        const img = new Image();
        img.src = image;

        img.onload = () => {
            // Create a canvas
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas dimensions (reduce size by 50% for compression)
            const MAX_WIDTH = img.width / 2;
            const MAX_HEIGHT = img.height / 2;
            canvas.width = MAX_WIDTH;
            canvas.height = MAX_HEIGHT;

            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

            // Export the canvas content as a compressed image
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Quality set to 70%
            setCompressedImage(compressedDataUrl);
        };

        img.onerror = () => {
            alert('Failed to load the image');
        };
    };

    return (
        <div className="mx-20">
            <h1 className="text-zinc-200 font-bold lg:text-5xl text-xl text-center pt-10">{compressedImage ? "Compressed Image🎉" : "Compress Image"}</h1>
            <div className="text-zinc-200 mt-10">
                {compressedImage ? (
                    <div className="mt-10 flex flex-col justify-center items-center">
                        <div className="border h-[20rem] w-[20rem] border-zinc-200 mt-4">
                            <img src={compressedImage} alt="compressedImage" className="w-full h-full object-contain" />
                        </div>
                        <a
                            href={compressedImage}
                            download="compressed-image.jpg"
                            className="mt-8 cursor-pointer   text-zinc-300 rounded-lg underline"
                        >
                            Download Compressed Image
                        </a>

                    </div>
                ) : <div>
                    <div className="flex lg:flex-row flex-col-reverse gap-10 justify-evenly items-center">
                        <input type="file" onChange={handleImageChange} accept="image/jpeg,image/png" />
                        <div className="border h-[20rem] w-[20rem] border-zinc-200">
                            {image ? (
                                <img src={image} alt="originalImage" className="w-full h-full object-contain" />
                            ) : (
                                <img src={thumbnail} alt="thumbnail" className="w-full h-full object-contain" />
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleCompressImage}
                        className="mt-10 m-auto block px-10 py-3 rounded-lg bg-green-700 hover:bg-green-800 text-white"
                    >
                        Compress Image
                    </button>
                </div>
                }
            </div>
        </div>
    );
};

export default CompressImage;