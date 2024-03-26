import "../components/style/ArticleBlog.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
const ArticleBlog = ({ Id, title, image, desc, data, profile,fullname, views, likes,comments }) => {
  const errors = () => {
    toast.error("To Like this post you must login first.", {
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
  const navigate = useNavigate();

  // Function to format a date string using the user's locale
  const formatYear = (dateString) => {
    const options = {
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDay = (dateString) => {
    const options = {
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatMonth = (dateString) => {
    const options = {
      month: "long",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
//   const [likeCount, setLikeCount] = useState(likes);
//   const [liked, setLiked] = useState(false); // State to track whether the post is liked
  
//   const iconColor = liked ? 'red' : 'black'; // Determine the color based on liked state


// const handleLike = async (ID) => {
//   setLiked(true)
//   const token = localStorage.getItem("token");

//   if (!token) {
//       errors(); 
//   } else {
//       try {
//           const response = await axios.post(
//               `https://blogbeckend.onrender.com/PostgreSQL/API/posts/like/${ID}`, // Dynamically include postId in the URL
//               {},
//               {
//                   headers: {
//                       authorization: `Bearer ${token}`,
//                   },
//               }
//           );

//           if (response.status === 200 || response.status === 201) {
              
//             if(response.data.message=='Your like removed'){
//               if(likeCount!=0){
//                 setLikeCount(prevCount => prevCount -1);
//                 setLiked(false)
//               }
              
//             }
//             if(response.data.message=='Your like added'){
//                 setLikeCount(prevCount => parseInt(prevCount) + 1);
//                 setLiked(true)
              
//             }
//           } else {
//               console.log('Failed to like post');
         
//           }
//       } catch (error) {
//           console.error("An error occurred while liking post:", error);
//       }
//   }
// };
const [likeCount, setLikeCount] = useState(likes);
const [likedPosts, setLikedPosts] = useState({}); // Object to track liked posts

useEffect(() => {
  // Load liked posts from localStorage when component mounts
  const likedPostsFromStorage = localStorage.getItem('likedPosts');
  if (likedPostsFromStorage) {
    setLikedPosts(JSON.parse(likedPostsFromStorage));
  }
}, []); // Empty dependency array to only run this effect once on mount

const iconColor = (ID) => {
  return likedPosts[ID] ? 'red' : 'black'; // Determine the color based on liked state for post with given postId
};

const handleLike = async (postId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    errors(); 
  } else {
    try {
      const response = await axios.post(
        `https://blogbeckend.onrender.com/PostgreSQL/API/posts/like/${postId}`, // Dynamically include postId in the URL
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        const updatedLikedPosts = { ...likedPosts };
        if (response.data.message === 'Your like removed') {
          if (likeCount !== 0) {
            setLikeCount(prevCount => prevCount - 1);
            updatedLikedPosts[postId] = false;
          }
        }
        if (response.data.message === 'Your like added') {
          setLikeCount(prevCount => parseInt(prevCount) + 1);
          updatedLikedPosts[postId] = true;
        }

        // Update liked posts in state and localStorage
        setLikedPosts(updatedLikedPosts);
        localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));
      } else {
        console.log('Failed to like post');
      }
    } catch (error) {
      console.error("An error occurred while liking post:", error);
    }
  }
};
const isImage = (url) => {
  return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(url);
};
const isVideo = (url) => {
  return /\.(mp4|webm|ogg)$/i.test(url);
};

  return (
    <>
      <div className="post">
       
        {isImage(image) ? (
           <div className="post-img">
    <img src={image} alt="" />
    </div>
  ) : (
    <video className="video-container" style={{ width: '100%', maxWidth: '100%', height: 'auto' }} controls>
    <source src={image} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  
  )}
       
       {isImage(image) ? (
         <div className="topper">
         <div className="topper-content">
           <div className="one">
             <span className="day">{formatDay(data)}</span>
           </div>
           <div className="two">
             <p class="yr">{formatYear(data)}</p>
             <p class="mos">{formatMonth(data)}</p>
           </div>
         </div>
       </div>
  ) : (
  <></>
  
  )}
       



        <div className="post-body">
          <Link to={`/BlogSingle/${Id}`}>
            {" "}
            <div className="post-title">
              <h1>{title}</h1>
            </div>
          </Link>
          <div
            className="post-desc"
            dangerouslySetInnerHTML={{ __html: desc }}
          ></div>
          <div className="postedby">
            
            <img src={profile} id="profile" />
            
              <h3 id="fullname">{fullname}</h3>
  
          </div>
          <div className="likeviewcomments">
          
          <div className="view-icon-container">
              <div className="notification-icon">
              <iconify-icon icon="feather:eye" id="myicons"></iconify-icon>
              </div>
              <div className="view-counter">{views}</div>
            </div>
          
          <div className="like-icon-container">
              <div className="notification-icon">
                {/* like  */}
                <form onSubmit={handleLike}>
                <iconify-icon icon="mdi:heart" id="myicons" onClick={() => handleLike(Id)} style={{ color: iconColor(Id) }}></iconify-icon>

      </form>
 

              </div>
              <div className="like-counter">{likeCount}</div>
            </div>
          
         <div className="mean-icon-container">
              <div className="notification-icon">
                <iconify-icon icon="ant-design:comment-outlined"></iconify-icon>
              </div>
              <div className="mean-counter">{comments}</div>
            </div>
          </div>
          <div className="post-footer">
            <div>
              <iconify-icon icon="eva:arrow-forward-fill"></iconify-icon>
            </div>
            <div>
            <Link to={`/blogSingle/${Id}?video=${encodeURIComponent(image)}`}>
  <p id="readmoree">Read more</p>
</Link>
              <ToastContainer /> 
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
export default ArticleBlog;
