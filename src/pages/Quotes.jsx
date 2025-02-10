import { useState, useEffect } from 'react';
import axios from 'axios';
import HeroPage from '../components/HeroPage';
import PropagateLoader from "react-spinners/PropagateLoader";
import '../components/style/quotes-page.css';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const quotesPerPage = 6;

  const categories = [
    "ALL",
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "VLOG"
  ];

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await axios.get('https://blog-backend-6y0w.onrender.com/PostgreSQL/API/quotes/get/all');
      setQuotes(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch quotes:', error);
      setLoading(false);
    }
  };

  // Filter quotes based on active category
  const filteredQuotes = activeCategory === 'ALL'
    ? quotes
    : quotes.filter(quote => quote.category === activeCategory);

  // Get current quotes for pagination
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote);
  const totalPages = Math.ceil(filteredQuotes.length / quotesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.querySelector('.quotes-grid').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <HeroPage title="Daily Quotes" />
      
      {loading ? (
        <div className="loader-container">
          <PropagateLoader color="#ffd369" size={20} />
        </div>
      ) : (
        <div className="quotes-page-container">
          <div className="categories-container">
            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${activeCategory === category ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(category);
                  setCurrentPage(1);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="quotes-grid">
            {currentQuotes.map((quote) => (
              <div key={quote.id} className="quote-card">
                <div className="quote-content">
                  <div className="quote-icon">"</div>
                  <p className="quote-text">{quote.quoteText}</p>
                  <div className="quote-details">
                    <p className="quote-author">― {quote.author}</p>
                    <span className="quote-category">{quote.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuotes.length === 0 && (
            <div className="no-quotes-message">
              <h3>No quotes available in this category yet!</h3>
              <p>Check back later for inspiring words.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination-dots">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(index + 1)}
                  aria-label={`Page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
