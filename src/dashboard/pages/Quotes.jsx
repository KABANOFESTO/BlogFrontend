import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/style/quotes.css';

export default function Quotes() {
  const [formData, setFormData] = useState({
    quoteText: '',
    author: '',
    category: ''
  });
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);

  const categories = [
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "LEADERSHIP",
    "VLOG"
  ];

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('https://blog-backend-6y0w.onrender.com/PostgreSQL/API/quotes/get/all');
      setQuotes(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch quotes');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add quotes');
        return;
      }

      const url = editingQuote
        ? `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/quotes/update/${editingQuote.id}`
        : 'https://blog-backend-6y0w.onrender.com/PostgreSQL/API/quotes/add';

      const response = await axios({
        method: editingQuote ? 'put' : 'post',
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200 || response.status === 201) {
        toast.success(editingQuote ? 'Quote updated successfully!' : 'Quote added successfully!');
        setFormData({
          quoteText: '',
          author: '',
          category: ''
        });
        setEditingQuote(null);
        fetchQuotes();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (quote) => {
    setEditingQuote(quote);
    setFormData({
      quoteText: quote.quoteText,
      author: quote.author,
      category: quote.category
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to delete quotes');
        return;
      }

      await axios.delete(`https://blog-backend-6y0w.onrender.com/PostgreSQL/API/quotes/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Quote deleted successfully!');
      fetchQuotes();
    } catch (error) {
      toast.error('Failed to delete quote');
    }
  };

  const handleCancel = () => {
    setEditingQuote(null);
    setFormData({
      quoteText: '',
      author: '',
      category: ''
    });
  };

  return (
    <div className="quotes-container">
      <div className="quotes-content">
        <div className="quotes-form-wrapper">
          <h2 className="quotes-title">{editingQuote ? 'Edit Quote' : 'Add New Quote'}</h2>
          <p className="quotes-subtitle">Share inspiring words with the world</p>

          <form onSubmit={handleSubmit} className="quotes-form">
            <div className="form-group">
              <label htmlFor="quoteText">Quote Text</label>
              <textarea
                id="quoteText"
                name="quoteText"
                value={formData.quoteText}
                onChange={handleChange}
                placeholder="Enter your inspiring quote..."
                required
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Who said this quote?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-buttons">
              <button 
                type="submit" 
                className="submit-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : editingQuote ? 'Update Quote' : 'Add Quote'}
              </button>
              {editingQuote && (
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="quotes-table-wrapper">
          <h2 className="quotes-title">Manage Quotes</h2>
          <div className="quotes-table-container">
            <table className="quotes-table">
              <thead>
                <tr>
                  <th>Quote</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((quote) => (
                  <tr key={quote.id}>
                    <td className="quote-text-cell">{quote.quoteText}</td>
                    <td>{quote.author}</td>
                    <td>{quote.category}</td>
                    <td className="actions-cell">
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(quote)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(quote.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
}