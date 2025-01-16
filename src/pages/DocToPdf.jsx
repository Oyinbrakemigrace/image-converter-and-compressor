import React, { useState } from 'react';
import mammoth from 'mammoth';
import jsPDF from 'jspdf';

const DocToPdf = () => {
    const [docFile, setDocFile] = useState(null);

    const handleDocChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            setDocFile(file);
        } else {
            alert('Please upload a valid DOC file.');
        }
    };

    const handleConvert = async () => {
        if (!docFile) {
            alert('Please upload a DOC file first.');
            return;
        }

        try {
            const arrayBuffer = await docFile.arrayBuffer();
            const { value: docText } = await mammoth.extractRawText({ arrayBuffer });

            const pdf = new jsPDF();
            const lines = pdf.splitTextToSize(docText, 190);
            lines.forEach((line, index) => pdf.text(10, 10 + index * 10, line));
            pdf.save('converted.pdf');
        } catch (error) {
            console.error('Error converting DOC to PDF:', error);
            alert('An error occurred while converting the DOC.');
        }
    };

    return (
        <div className='flex flex-col justify-center items-center mx-20'>
            <h1 className='text-zinc-200 font-bold lg:text-5xl text-xl text-center pt-10'>Convert DOC to PDF</h1>
            <div className='mt-20 text-zinc-200'>
                <input
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleDocChange}
                />
                <button
                    onClick={handleConvert}
                    className='mt-20 block mx-auto px-10 py-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white'
                >
                    Convert to PDF
                </button>
            </div>
        </div>
    );
};

export default DocToPdf;
