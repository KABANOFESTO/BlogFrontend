import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../components/style/contact.css";
import HeroPage from "../components/HeroPage";

export default function Contact() {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submission

    try {
      const response = await axios.post('https://blog-backend-6y0w.onrender.com/PostgreSQL/API/mesages/add', formData);
      toast.success(response.data.message);
      setFormData({
        names: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  return (
    <>
      <ToastContainer />
      <HeroPage title={"Contact"} />
      <div className="contact-section container">
        <div className="contact-info">
          <div className="contact-title">
            <h1>Contact Information</h1>
          </div>
          <div className="contact-content">
            <div className="address">
              <p>Address:  Kigali/Kicukiro</p>
            </div>
            <div>
              <p>
                Phone: <span className="bold">+250 785651518</span>
              </p>
            </div>
            <div>
              <p>
                Email: <span className="bold">maureekalala@gmail.com </span>
              </p>
            </div>
            <div>
              <p>
                Website: <span className="bold"><a href="https://maureen-two.vercel.app/" target="_blank" rel="noopener noreferrer">maureen web</a></span>
              </p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="contact-map">
            <iframe
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=kacyiru RBA&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="90%"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-form-groupe">
            <form onSubmit={handleSubmit}>
              <div className="form-groupe">
                <input type="text" placeholder="Your Name" name="names" value={formData.names} onChange={handleChange} />
              </div>
              <div className="form-groupe">
                <input type="text" placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="form-groupe">
                <input type="text" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} />
              </div>
              <div className="form-groupe">
                <textarea
                  name="message"
                  cols="30"
                  rows="10"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-groupe">
                <button type="submit" className="send-btn" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
