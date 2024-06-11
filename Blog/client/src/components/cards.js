"use client";
import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import Swal from 'sweetalert2';

const Cards = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    Blog: '',
    Image: '',
    Paragraph: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getBlogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchData();
  }, []);

  const openPopup = (card) => {
    setSelectedCard(card);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openUpdatePopup = (card) => {
    setSelectedCard(card);
    setUpdateDetails({
      Blog: card.Blog,
      Image: card.Image,
      Paragraph: card.Paragraph
    });
    setIsUpdatePopupOpen(true);
  };

  const closeUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/update/${selectedCard._id}`, updateDetails);
      Swal.fire('Success', 'Blog updated successfully', 'success');
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === selectedCard._id ? { ...blog, ...updateDetails } : blog
        )
      );
      closeUpdatePopup();
    } catch (error) {
      console.error('Error updating blog:', error);
      Swal.fire('Error', 'Error updating blog', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      Swal.fire('Success', 'Blog deleted successfully', 'success');
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      Swal.fire('Error', 'Error deleting blog', 'error');
    }
  };

  return (
    <main className="m-auto w-[90vw] flex flex-wrap justify-center my-20 gap-4">
      {blogs.map((card) => (
        <div key={card._id} className="w-[40vw] h-auto border border-gray-100 rounded-lg shadow-lg p-4">
          <img src={card.Image} alt={card.Blog} className="rounded-lg w-full h-[20vw] object-cover mb-4" />
          <h1 className="text-black font-serif font-bold text-[2vw] text-center mb-4">{card.Blog}</h1>
          <div className="flex justify-around">
            <button onClick={() => openPopup(card)} className="text-white bg-purple-500 py-2 px-4 rounded-lg">Read more</button>
            <button onClick={() => openUpdatePopup(card)} className="text-white bg-blue-500 py-2 px-4 rounded-lg">Update</button>
            <button onClick={() => handleDelete(card._id)} className="text-white bg-red-500 py-2 px-4 rounded-lg">Delete</button>
          </div>
        </div>
      ))}

      {isPopupOpen && selectedCard && (
        <div className="fixed top-14 left-0 right-0 w-[90vw] mx-auto bg-white z-10 p-8 rounded-lg shadow-lg">
          <button onClick={closePopup} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
            <RxCross2 className="h-6 w-6 text-black" />
          </button>
          <img src={selectedCard.Image} alt="" className="h-[60vh] w-full object-cover mb-4" />
          <h1 className="text-black font-serif font-bold text-[2vw] text-center">{selectedCard.Blog}</h1>
          <p>{selectedCard.Paragraph}</p>
        </div>
      )}

      {isUpdatePopupOpen && selectedCard && (
        <div className="fixed top-14 left-0 right-0 w-[90vw] mx-auto bg-white z-10 p-8 rounded-lg shadow-lg">
          <button onClick={closeUpdatePopup} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900">
            <RxCross2 className="h-6 w-6 text-black" />
          </button>
          <form onSubmit={handleUpdateSubmit}>
            <div className="mb-4">
              <label htmlFor="Blog" className="block text-black font-bold">Blog Name</label>
              <input
                type="text"
                id="Blog"
                name="Blog"
                value={updateDetails.Blog}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter blog name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Image" className="block text-black font-bold">Image URL</label>
              <input
                type="text"
                id="Image"
                name="Image"
                value={updateDetails.Image}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter image URL"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Paragraph" className="block text-black font-bold">Paragraph</label>
              <textarea
                id="Paragraph"
                name="Paragraph"
                value={updateDetails.Paragraph}
                onChange={handleUpdateChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Enter blog paragraph"
                rows="4"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">Update</button>
          </form>
        </div>
      )}
    </main>
  );
};

export default Cards;
