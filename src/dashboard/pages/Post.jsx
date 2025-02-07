import "../components/style/postpage.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Post() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [ispending, setIsPending] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("FAITH & SPIRITUALITY");

  const categories = [
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "VLOG"
  ];

  const success = () => {
    toast.success("Post has been deleted", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        // Try to get cached data first
        const cachedData = localStorage.getItem("postsData");
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setBlogs(parsedData);
          setIsPending(false);
        }

        // Fetch fresh data from API
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all"
        );

        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          const postsData = response.data.data
            .filter(post => post.postTitle && (post.postImage || post.postVideo))
            .map(post => ({
              id: post.id,
              postTitle: post.postTitle,
              postContent: post.postContent,
              postImage: post.postImage,
              postVideo: post.postVideo,
              category: post.category || "FAITH & SPIRITUALITY",
              createdAt: post.createdAt,
              views: post.views || 0
            }))
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setBlogs(postsData);
          localStorage.setItem("postsData", JSON.stringify(postsData));
        } else {
          console.error("Invalid API response format:", response.data);
          if (!cachedData) {
            toast.error("Error loading posts. Invalid data format.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!localStorage.getItem("postsData")) {
          toast.error(error.response?.data?.message || "Failed to load posts");
        }
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    if (window.confirm("Do you want to delete this post?")) {
      try {
        await axios.delete(
          `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/delete/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        success();
        const updatedBlogs = blogs.filter(post => post.id !== id);
        setBlogs(updatedBlogs);
        localStorage.setItem("postsData", JSON.stringify(updatedBlogs));
      } catch (err) {
        console.error("Delete error:", err);
        toast.error("Failed to delete post. Please try again.");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getFilteredPosts = () => {
    return blogs.filter(post => post.category === selectedCategory);
  };

  return (
    <div className="post-section container-section">
      <div className="manage-posts-container">
        <div className="manage-posts">
          <div className="title-container">
            <div>
              <h1 className="title">Manage Posts</h1>
              <div className="action-buttons">
                <Link to="/dashboard/post/create">
                  <button className="action-btn" style={{width: "100%",height: "100%",textAlign: "center"}}>
                    <iconify-icon icon="material-symbols:add-circle-outline"></iconify-icon>
                    Create New Post
                  </button>
                </Link>
                <Link to="/dashboard/messages">
                  <button className="action-btn" style={{width: "100%",height: "100%",textAlign: "center"}}>
                    <iconify-icon icon="material-symbols:message-outline"></iconify-icon>
                    View Messages
                  </button>
                </Link>
              </div>
            </div>
            <div className="filters-container">
              <select
                className="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {ispending ? (
            <div className="loader-container">
              <PropagateLoader
                color="#ffd369"
                loading
                size={20}
                speedMultiplier={1}
              />
            </div>
          ) : (
            <table id="customers">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Media</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th colSpan={2}>Actions</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {getFilteredPosts().map((post, index) => (
                  <tr key={post.id}>
                    <td>{index + 1}</td>
                    <td className="t-image">
                      {post.postVideo ? (
                        <video src={post.postVideo} style={{ width: "100px", height: "60px" }} />
                      ) : (
                        <img 
                          src={post.postImage || 'https://res.cloudinary.com/da12yf0am/image/upload/v1711399753/fkxzmw7ipullmh8c8loz.png'} 
                          alt="" 
                          style={{ width: "100px", height: "60px", objectFit: "cover" }}
                        />
                      )}
                    </td>
                    <td className="t-title">
                      <h4>{post.postTitle}</h4>
                    </td>
                    <td>{post.category}</td>
                    <td>
                      <Link 
                        to={`/dashboard/editpost/${post.id}`}
                        className="action-icon edit"
                      >
                        <iconify-icon icon="mingcute:edit-line"></iconify-icon>
                      </Link>
                    </td>
                    <td>
                      <button
                        className="action-icon delete"
                        onClick={() => handleDelete(post.id)}
                      >
                        <iconify-icon icon="ion:trash-outline"></iconify-icon>
                      </button>
                    </td>
                    <td>{formatDate(post.createdAt)}</td>
                  </tr>
                ))}
                {getFilteredPosts().length === 0 && (
                  <tr>
                    <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                      No posts found in this category
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
