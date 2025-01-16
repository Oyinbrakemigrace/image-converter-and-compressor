import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { ClipLoader } from 'react-spinners';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
).toString();

const PdfToDoc = () => {
    const [loading, setLoading] = useState(false);
    const [textContent, setTextContent] = useState('');

    const handlePdfToDoc = async (file) => {
        setLoading(true);
        try {
            const loadingTask = pdfjsLib.getDocument(URL.createObjectURL(file));
            const pdf = await loadingTask.promise;
            let fullText = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                textContent.items.forEach((item) => {
                    fullText += item.str + ' ';
                });
            }

            setTextContent(fullText);
            downloadAsDoc(fullText);
        } catch (error) {
            console.error('Error extracting text:', error);
            alert('Failed to process the PDF. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const downloadAsDoc = (text) => {
        const blob = new Blob([text], { type: 'application/msword' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'output.doc';
        link.click();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            handlePdfToDoc(file);
        } else {
            alert('Please select a valid PDF file.');
        }
    };

    return (
        <div className="mx-20">
            <h1 className="text-zinc-200 font-bold lg:text-5xl text-2xl whitespace-nowrap text-center pt-10">
                Convert PDF to DOC
            </h1>
            <div className="text-zinc-200 mt-20 ">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="application/pdf"
                    className="block mx-auto mb-4"
                />
                {loading ? (
                    <div className='mt-20 flex items-center justify-center space-x-2'>
                            <span className='text-2xl text-blue-500'>Generating DOC</span>
                        <ClipLoader size={25} color='#3b82f6' />
                        </div>
                ) : (
                    <p className="mt-20 text-center text-blue-500">
                        {textContent ? 'Conversion completed!🎉' : 'Upload a PDF file to begin.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PdfToDoc;
