import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const GeneratePDFPage: React.FC = () => {
  const products = useSelector((state: RootState) => state.products.products);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setErrorMessage('');

    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:5000/api/invoices/generate',
        { products },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob', // Important for file download
        }
      );

      if (response.status === 201 || response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
      } else {
        setErrorMessage('Error generating PDF. Please try again later.');
      }
    } catch (error) {
      console.error('Error generating PDF', error);

      if (axios.isAxiosError(error)) {
        // Axios-specific error
        setErrorMessage(error.response?.data?.message || 'Error generating PDF. Please try again later.');
      } else if (error instanceof Error) {
        // Generic error
        setErrorMessage(error.message);
      } else {
        // Unknown error
        setErrorMessage('An unknown error occurred. Please try again later.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto flex justify-center items-center h-screen">
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 mt-4 mr-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
      <div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button 
          onClick={handleGeneratePDF} 
          disabled={isGenerating}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
        </button>
      </div>
    </div>
  );
};

export default GeneratePDFPage;
