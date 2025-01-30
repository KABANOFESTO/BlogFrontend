import HeroPage from "../components/HeroPage";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "../components/style/BlogSingle.css";
import Cavatar from "../Images/commetor-avatar.png";
import {  useLocation } from "react-router-dom";


const BlogSingle = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});
  const [relatedblogs, setrelatedblogs] = useState([]);
  const [commentBody, setcommentBody] = useState("");
  const [comments, Setcomments] = useState([])
  // console.log("commentBody", commentBody);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const video = queryParams.get("video");


  // ===================== alerts ==========================
  const errors = () => {
    toast.error("To add a comment you must login first.", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const success = () => {
    toast.success("Comment added successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  // ======================== Fetching single blog ======================
  
  const displayAll = async () => {
    const response = await fetch(
      `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/single/post/${id}`
    );
    const res = await response.json();
    setBlogData(res.data);
    Setcomments(res.data.Comments)
  };
  useEffect(() => {
    displayAll();
  }, [id]);

  
  let comment_view = blogData.comment;
  // console.log(blogData)

  // ======================== fetching recent posts ====================
  useEffect(() => {
    const Relatedpost = async () => {
      await fetch(
        `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all`
      )
        .then((response) => response.json())
        .then((res) => {
          setrelatedblogs(res.data);
        });
    };
    Relatedpost();
  }, []);

  // ==================== post comment ==============
  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("commentBody", commentBody);

    const token = localStorage.getItem("token");

    if (!token) {
      errors ();
    }   else{
      try {
        const response = await axios.post(
          `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/comments/add/${id}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          success();
          console.log(response.data);
          setcommentBody("");
          displayAll();
        } else {
          toast.error("comment post failed",{
            position: "top-center",
            autoClose: 3000,
          });
          console.log(response.status);
        }
      } catch (error) {
        console.log("error", error);
      toast.error("an error occured while posting",{
        position: "top-center",
        autoClose: 3000,
        });
      }
    };
  }
  // Function to format a date string using the user's locale
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  // Function to format a date string using the user's locale
  const formatRecent = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const isImage = (url) => {
    return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
  };
  console.log(blogData.postImage)
  return (
    <>
      <HeroPage title={"Blog Single"} />
      <div className="blogSingle-section container">
        <div className="col-1">
          <div className="blogSingle-ft-img">
            {/* <img src={blogData.postImage} alt="Feature Photos" /> */}
            {isImage(blogData.postImage) ? (
          <div className="blogSingle-ft-img">
              <img src={blogData.postImage} alt="" />
            </div>
        
        ) : (
          <div className="video-container">
           <video style={{ width: '100%', maxWidth: '100%', height: 'auto' }} controls>
  <source src={video} type="video/mp4"/>
  Your browser does not support the video tag.
</video>
          </div>
        )}
          </div>
          <div className="blogSingle-content">
            <h2>{blogData.postTitle}</h2>
            <p>
              <div dangerouslySetInnerHTML={{ __html: blogData.postContent }}></div>
            </p>
            <p>
              <span className="publishe">Published</span>
              {formatDate(blogData.createdAt)}
            </p>
          </div>
          <div className="author-section">
            <div className="author-avatar">
              {/* <img
                src={!blogData.postedBy.profile ? Cavatar : blogData.postedBy.profile}
                alt="author_profile"
              /> */}

      {/* <iconify-icon icon="mdi:heart" id="myicons"></iconify-icon> */}

            </div>
            <div className="author-info">
              <div className="author-name">
                <h4>
                  {/* {blogData.postedBy.firstName}&nbsp;{blogData.postedBy.lastName} */}
                </h4>
              </div>
              <div className="author-social-media">
                <div className="twitter">
                  <a href="#">
                    <span>
                      <iconify-icon icon="ri:twitter-fill"></iconify-icon>
                    </span>
                  </a>
                </div>
                <div className="facebook">
                  <a href="#">
                    <span>
                      <iconify-icon icon="ri:facebook-fill"></iconify-icon>
                    </span>
                  </a>
                </div>
                <div className="instagram">
                  <a href="#">
                    <span>
                      <iconify-icon icon="bi:instagram"></iconify-icon>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="comment-section-wrap">
            <h3>{comments.length} Comments </h3>
            {Array.isArray(comments) && comments.length > 0 ? (
              <ul className="comment-list">
                {comments.map((comments, index) => (
                  <li className="comment" key={index}>
                    <div class="vcard">
                      <img
                        src={
                          !comments.CommentedBy.profile
                            ? Cavatar
                            : comments.CommentedBy.profile
                        }
                        alt="Image"
                      />
                    </div>
                    <div className="comment-body">
                      <p className="commentor">
                        {comments.CommentedBy.firstName}&nbsp;{comments.CommentedBy.lastName}
                      </p>
                      <div className="meta">
                        {formatDate(comments.createdAt)}
                      </div>
                      <p className="comment-content">{comments.commentBody}</p>
                      <p>
                        <a href="#" class="reply">
                          Reply
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Not yet commented</p>
            )}
            <div className="comment-form-wrap">
              <h3>Leave a comment</h3>
              <div className="contact-form-groupe">
                <form onSubmit={handleComment}>
                  <div className="form-groupe">
                    <textarea
                      disabled={!localStorage.getItem("token") ? true : false}
                      cols="30"
                      rows="5"
                      placeholder="Comment.."
                      onChange={(e) => {
                        setcommentBody(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="form-groupe">
                    <button className="send-btn">Add comment</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-2">
          <div className="sidebar-box">
            <form action="#">
              <div className="form-groupe">
                <input type="text" placeholder="Type a keyword and hit enter" />
              </div>
            </form>
          </div>
          <div className="sidebar-box">
            <div className="categories">
              <h3>Categories</h3>
              <ul>
                <li className="category-link">Healt and Science</li>
                <li className="category-link">Technology</li>
                <li className="category-link">Fashion</li>
                <li className="category-link">Design</li>
                <li className="category-link">Sports</li>
              </ul>
            </div>
          </div>
          <div className="sidebar-box">
            <h3>Recent Blogs</h3>

            <div className="recent-blog">
              {relatedblogs &&
                relatedblogs.slice(0, 3).map((post, index) => (
                  <div class="block" key={index}>
                    <a class="blog-img">
                      {/* <img src={post.postImage} alt="Image" /> */}
                      {isImage(post.postImage) ? (
    <img src={post.postImage} alt="" />
  ) : (
    
      <img src='https://res.cloudinary.com/da12yf0am/image/upload/v1711399753/fkxzmw7ipullmh8c8loz.png' alt="" />
  
  )}
                    </a>
                    <div class="text">
                      <h4 class="heading">
                        <Link to={`/BlogSingle/${post.id}`}>{post.postTitle}</Link>
                      </h4>
                      <div class="meta">
                        <div>
                          <a href="#">
                            <span class="icon-calendar">
                              <iconify-icon icon="fluent:calendar-28-filled"></iconify-icon>
                            </span>{" "}
                            {formatRecent(post.createdAt)}
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <span class="icon-person">
                              <iconify-icon icon="solar:user-bold"></iconify-icon>
                            </span>{" "}
                            Admin
                          </a>
                        </div>
                        <div>
                          <a href="#">
                            <span class="icon-chat">
                              <iconify-icon icon="mdi:message-text"></iconify-icon>
                            </span>{" "}
                            {post.Comments.length}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default BlogSingle;

