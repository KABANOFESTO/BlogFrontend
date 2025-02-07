import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { Link } from 'react-router-dom';
import "../components/style/postpage.css";

export default function Post() {
  const [messages, setMessages] = useState([]);
  const [ispending, setIsPending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blog-backend-6y0w.onrender.com/PostgreSQL/API/mesages/get/all');
        // Sort messages by id in ascending order
        const sortedMessages = response.data.messages.sort((a, b) => b.id - a.id);
        setMessages(sortedMessages);
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsPending(false);
      }
    };
  
    fetchData();
  }, []);
  
  

  const handleDelete = async (id) => {
    if (window.confirm('Do you want to delete this message?')) {
      try {
        await axios.delete(`https://blog-backend-6y0w.onrender.com/PostgreSQL/API/mesages/delete/${id}`);
        success();
        setMessages(messages.filter((message) => message.id !== id));
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const success = () => {
    toast.success('Message has been deleted successfully', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  // Function to format a date string using the user's locale
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="post-section container-section">
        <div className="manage-posts-container">
          <div className="manage-posts">
            <div className="title-container">
              <h1 className="title">Manage All Messages</h1>
            </div>
            <table id="customers">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>sent at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {ispending && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      <PropagateLoader color="#ffd369" cssOverride={{}} loading size={20} speedMultiplier={1} />
                    </td>
                  </tr>
                )}
                {!ispending && messages.map((message, index) => (
                  <tr key={message.id}>
                    <td>{index + 1}</td>
                    <td>{message.names}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>{formatDate(message.createdAt)}</td>
                    <td>
                      <div className="action-icon delete" onClick={() => handleDelete(message.id)}>
                        <iconify-icon icon="ion:trash-outline"></iconify-icon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
