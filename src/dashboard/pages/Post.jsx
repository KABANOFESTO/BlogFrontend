import "../components/style/postpage.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Post() {
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [ispending, setIsPending] = useState(true);

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
        let postsData = localStorage.getItem("postsData");
        if (!postsData) {
          const response = await axios.get(
            "https://blogbeckend.onrender.com/PostgreSQL/API/posts/get/all"
          );
          postsData = response.data.data.sort((a, b) => b.id - a.id);;
          localStorage.setItem("postsData", JSON.stringify(postsData));
        } else {
          postsData = JSON.parse(postsData);
        }
        setBlogs(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  async function handleDelete(id) {
    const token = localStorage.getItem("token");
    const conf = window.confirm("Do you want to delete this post");
    if (conf) {
      try {
        const response = await axios.delete(
          `https://blogbeckend.onrender.com/PostgreSQL/API/posts/delete/${id}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        success();
        const updatedBlogs = blogs.filter(post => post.id !== id);
        setBlogs(updatedBlogs);
        localStorage.setItem("postsData", JSON.stringify(updatedBlogs));
        localStorage.setItem("blogData", JSON.stringify(updatedBlogs));
      } catch (err) {
        console.error(err);
      }
    }
  }

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const isImage = (url) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
  };

  return (
    <>
      <div className="post-section container-section">
        <div className="manage-posts-container">
          <div className="manage-posts">
            <div className="title-container">
              <div>
                <h1 className="title">Manage All Posts</h1>
                <Link to={`/addvideo/`}>
                  <button style={{ margin: '0.2cm', border: '1px solid orange',color:'orange', backgroundColor: 'whitesmoke', padding: '0.1cm', borderRadius: '4px' }}>
                    <p>add video post</p>
                  </button>
                </Link>

                <Link to={`/messages/`}>
                  <button style={{ margin: '0.2cm', border: '1px solid orange',color:'orange', backgroundColor: 'whitesmoke', padding: '0.1cm', borderRadius: '4px' }}>
                    <p>View messages</p>
                  </button>
                </Link>
              </div>
              <div className="search-form">
                <input type="text" placeholder="search..." />
                <button className="user-search-btn">
                  <iconify-icon icon="ion:search-outline"></iconify-icon>
                </button>
              </div>
            </div>
            <table id="customers">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Post Image</th>
                  <th>Post Title</th>
                  <th colSpan={2}>Action</th>
                  <th>Views</th>
                  <th>Created on</th>
                </tr>
              </thead>
              <tbody>
                {ispending && (
                  <div className="Loader container" style={{marginLeft:'3cm'}}>
                    <PropagateLoader
                      color="#ffd369"
                      cssOverride={{}}
                      loading
                      size={20}
                      speedMultiplier={1}
                    />
                  </div>
                )}
                {blogs.map((post, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="t-image">
                        {isImage(post.postImage) ? (
                          <img src={post.postImage} alt="" />
                        ) : (
                          <img src='https://res.cloudinary.com/da12yf0am/image/upload/v1711399753/fkxzmw7ipullmh8c8loz.png' alt="" />
                        )}
                      </td>
                      <td className="t-title">
                        <h4>{post.postTitle}</h4>
                      </td>
                      <td>
                        <div className="action-icon edit">
                          <Link to={`/editpost/${post.id}`}>
                            <iconify-icon icon="mingcute:edit-line"></iconify-icon>
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div
                          className="action-icon delete"
                          onClick={(e) => handleDelete(post.id)}
                        >
                          <iconify-icon icon="ion:trash-outline"></iconify-icon>
                        </div>
                      </td>
                      <td>
                        <div className="views-container">
                          <div className="action-icon views">
                            <iconify-icon icon="raphael:view"></iconify-icon>
                          </div>
                          <div className="views-label">{post.views}</div>
                        </div>
                      </td>
                      <td>{formatDate(post.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {openModalUpdate && <UpdatePost closeModal={setOpenModalUpdate} />}
      </div>
      <ToastContainer />
    </>
  );
}
