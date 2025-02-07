import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import "../components/style/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('stats');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  const categories = [
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "VLOG"
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchAllData = async () => {
      try {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // Fetch posts
        const postsRes = await axios.get("https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all", { headers });
        console.log('Posts response:', postsRes.data);
        setPosts(postsRes.data.data || []);
        setTotalPages(Math.ceil((postsRes.data.data || []).length / itemsPerPage));

        // Fetch users
        const usersRes = await axios.get("https://blog-backend-6y0w.onrender.com/PostgreSQL/API/users/get/users", { headers });
        console.log('Users response:', usersRes.data);
        setUsers(usersRes.data.data || []);

        // Fetch comments
        const commentsRes = await axios.get("https://blog-backend-6y0w.onrender.com/PostgreSQL/API/comments/all", { headers });
        console.log('Comments response:', commentsRes.data);
        setComments(commentsRes.data.data || []);

        // Fetch replies
        const repliesRes = await axios.get("https://blog-backend-6y0w.onrender.com/PostgreSQL/API/replies/all", { headers });
        console.log('Replies response:', repliesRes.data);
        setReplies(repliesRes.data.data || []);

        // Fetch messages
        const messagesRes = await axios.get("https://blog-backend-6y0w.onrender.com/PostgreSQL/API/messages/get/all", { headers });
        console.log('Messages response:', messagesRes.data);
        setMessages(messagesRes.data.data || []);

      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  const getPostsByCategory = () => {
    if (selectedCategory === "all") return posts;
    return posts.filter(post => post.category === selectedCategory);
  };

  const getPaginatedPosts = () => {
    const filteredPosts = getPostsByCategory();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderStatistics = () => {
    const stats = [
      { title: 'Total Posts', value: posts?.length || 0 },
      { title: 'Total Users', value: users?.length || 0 },
      { title: 'Total Comments', value: comments?.length || 0 },
      { title: 'Total Messages', value: messages?.length || 0 }
    ];

    const categoryCounts = categories.map(category => ({
      name: category,
      count: posts.filter(post => post.category === category).length || 0
    }));

    return (
      <div className="stats-container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.title}</h3>
              <div className="stat-number">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="category-stats">
          <h3>Posts by Category</h3>
          <div className="category-grid">
            {categoryCounts.map((category, index) => (
              <div key={index} className="category-card">
                <h4>{category.name}</h4>
                <p>{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRecentPosts = () => {
    const paginatedPosts = getPaginatedPosts();

    return (
      <div className="posts-section">
        <div className="category-filter">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="posts-grid">
          {paginatedPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-image">
                <img src={post.image || 'default-image.jpg'} alt={post.title} />
              </div>
              <div className="post-content">
                <h3>{post.title}</h3>
                <div className="post-category">{post.category}</div>
                <p className="post-excerpt">{post.content?.substring(0, 100)}...</p>
                <div className="post-actions">
                  <button onClick={() => navigate(`/dashboard/editpost/${post.id}`)}>
                    Edit Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <PropagateLoader color="#ffd369" />
        </div>
      ) : (
        <>
          <div className="dashboard-header">
            <h1>Dashboard Overview</h1>
            <div className="dashboard-tabs">
              <button 
                className={`tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
                onClick={() => setActiveTab('stats')}
              >
                Statistics
              </button>
              <button 
                className={`tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
                onClick={() => setActiveTab('posts')}
              >
                Posts
              </button>
              <button 
                className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                onClick={() => navigate('/dashboard/post')}
              >
                Create Post
              </button>
            </div>
          </div>

          <div className="dashboard-section">
            {activeTab === 'stats' && renderStatistics()}
            {activeTab === 'posts' && renderRecentPosts()}
          </div>
        </>
      )}
    </>
  );
}
