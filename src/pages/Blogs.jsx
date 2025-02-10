import ArticleBlog from "../components/ArticleBlog";
import HeroPage from "../components/HeroPage";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/contact.css";
// import "../components/style/pegination.css";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("FAITH & SPIRITUALITY");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const categories = [
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "VLOG"
  ];

  useEffect(() => {
    const fetchBlogsByCategory = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/category/${encodeURIComponent(activeCategory)}`
        );
        setBlogs(response.data.data.sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsByCategory();
  }, [activeCategory]);

  const totalPages = Math.ceil(blogs.length / postsPerPage);
  const currentPosts = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    document.querySelector('.Articles-section').scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <>
      <HeroPage title="Blogs" />
      {loading && (
        <div className="Loader container">
          <PropagateLoader color="#ffd369" loading size={20} />
        </div>
      )}

      <div className="container">
        <div className="blog-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <br />
      <div className="Articles-section container">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <ArticleBlog
              key={post.id}
              Id={post.id}
              title={post.postTitle}
              image={post.postImage}
              desc={post.postContent}
              profile={post.postedBy.profile}
              fullname={`${post.postedBy.firstName} ${post.postedBy.lastName}`}
              views={post.views}
              likes={post.allLikes}
              comments={post.allComents}
              data={post.createdAt}
            />
          ))
        ) : (
          <div className="no-posts-message">
            <h3>No posts available in this category yet!</h3>
            <p>Stay tuned for upcoming content.</p>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination-dots">
          {[...Array(totalPages)].map((_, index) => (
            <span
              key={index}
              className={`dot ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(index + 1)}
            />
          ))}
        </div>
      )}
    </>
  );
}
