"use client";
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '@/components/Navbar';

const Setting = () => {
  const [blogName, setBlogName] = useState('');
  const [image, setImage] = useState('');
  const [paragraph, setParagraph] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/save', {
        Blog: blogName,
        Paragraph: paragraph,
        Image: image
      });
      console.log('Blog saved:', response.data);
      Swal.fire({
        title: 'Success!',
        text: 'Data added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setBlogName('');
      setImage('');
      setParagraph('');
    } catch (error) {
      console.error('Error saving blog:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <main>
        <Navbar/>
      <div className='w-[90vw] m-auto'>
        <h1 className='text-center font-serif font-bold text-black text-[2vw]'>
          Add your Blog
        </h1>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="blogName" className="block text-black font-bold">Blog Name</label>
            <input 
              type="text" 
              id="blogName"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 w-full" 
              placeholder="Enter blog name" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-black font-bold">Image URL</label>
            <input 
              type="text" 
              id="image" 
              value={image}
              onChange={(e) => setImage(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 w-full" 
              placeholder="Enter image URL" 
              required 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="paragraph" className="block text-black font-bold">Paragraph</label>
            <textarea 
              id="paragraph" 
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)} 
              className="border border-gray-300 rounded-md p-2 w-full" 
              placeholder="Enter blog paragraph" 
              rows="4" 
              required 
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Submit</button>
        </form>
      </div>
    </main>
  );
};

export default Setting;
