import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';

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
            <h1 className="text-zinc-200 font-bold lg:text-5xl text-2xl text-center pt-10">
                Convert PDF to DOC
            </h1>
            <div className="text-zinc-200 mt-10 ">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="application/pdf"
                    className="block mx-auto mb-4"
                />
                {loading ? (
                    <div className="flex justify-center items-center">
                        <span className="text-xl text-zinc-200 mr-2">Processing...</span>
                    </div>
                ) : (
                    <p className="mt-4 text-center text-green-600">
                        {textContent ? 'Conversion completed!🎉' : 'Upload a PDF file to begin.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PdfToDoc;
