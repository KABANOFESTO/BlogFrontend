import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaImage, FaVideo, FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/createpost.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "FAITH & SPIRITUALITY",
    mediaType: "image",
    media: null,
  });
  const [preview, setPreview] = useState(null);

  const categories = [
    "FAITH & SPIRITUALITY",
    "PERSONAL GROWTH & SELF DISCOVERY",
    "KINDNESS & COMPASSION",
    "VLOG",
  ];

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMediaTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      mediaType: type,
      media: null,
    }));
    setPreview(null);
  };

  const validateFile = (file) => {
    if (!file) return { valid: true };

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    const maxSize = formData.mediaType === 'image' ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;

    if (formData.mediaType === 'image' && !isImage) {
      return { valid: false, message: "Please select a valid image file" };
    }

    if (formData.mediaType === 'video' && !isVideo) {
      return { valid: false, message: "Please select a valid video file" };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        message: `File size exceeds ${maxSize / (1024 * 1024)}MB limit`
      };
    }

    return { valid: true };
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const validation = validateFile(file);
      if (!validation.valid) {
        toast.error(validation.message);
        e.target.value = '';
        return;
      }

      setFormData((prev) => ({
        ...prev,
        media: file,
      }));

      const objectURL = URL.createObjectURL(file);
      setPreview(objectURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToast = toast.loading("Creating your post...");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.update(loadingToast, {
          render: "Please login to continue",
          type: "error",
          isLoading: false,
          autoClose: 3000
        });
        navigate("/login");
        return;
      }

      const form = new FormData();
      form.append("postTitle", formData.title.trim());
      form.append("postContent", formData.content.trim());
      form.append("category", formData.category);

      if (formData.media) {
        form.append("postImage", formData.media);
      }

      const response = await axios.post(
        "http://localhost:2400/PostgreSQL/API/posts/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 30000,
        }
      );

      if (response.data.status === "201") {
        toast.update(loadingToast, {
          render: "🎉 Post created successfully!",
          type: "success",
          isLoading: false,
          autoClose: 2000
        });

        // Wait for toast to be visible before navigating
        setTimeout(() => {
          navigate("/dashboard/post");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating post:", error);

      let errorMessage = "Failed to create post. Please try again.";

      if (error.response) {
        // Handle specific error cases
        switch (error.response.status) {
          case 400:
            errorMessage = error.response.data.message || "Invalid input data";
            break;
          case 401:
            errorMessage = "Session expired. Please login again";
            setTimeout(() => navigate("/login"), 2000);
            break;
          case 413:
            errorMessage = "File size too large";
            break;
          case 500:
            errorMessage = "Server error. Please try again later";
            break;
          default:
            errorMessage = error.response.data.message || "Something went wrong";
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please check your connection.";
      }

      toast.update(loadingToast, {
        render: errorMessage,
        type: "error",
        isLoading: false,
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const clearMedia = () => {
    setFormData((prev) => ({
      ...prev,
      media: null,
    }));
    setPreview(null);
  };

  return (
    <div className="create-post-container">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="create-post-header">
        <h1>Create New Post</h1>
        <button className="back-btn" onClick={() => navigate("/dashboard/post")}>
          Back to Posts
        </button>
      </div>

      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Enter post title"
            maxLength={255}
          />
        </div>

        <div className="form-group">
          <label>Media Type</label>
          <div className="media-type-buttons">
            <button
              type="button"
              className={`media-btn ${formData.mediaType === "image" ? "active" : ""}`}
              onClick={() => handleMediaTypeChange("image")}
            >
              <FaImage /> Image
            </button>
            <button
              type="button"
              className={`media-btn ${formData.mediaType === "video" ? "active" : ""}`}
              onClick={() => handleMediaTypeChange("video")}
            >
              <FaVideo /> Video
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="file">
            {formData.mediaType === "image" ? "Choose an Image" : "Choose a Video"}
            <span className="file-limits">
              {formData.mediaType === "image" ? " (Max 5MB)" : " (Max 50MB)"}
            </span>
          </label>
          <div className="media-input-container">
            <input
              type="file"
              id="file"
              name="file"
              accept={formData.mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleMediaChange}
              required
            />
            {preview && (
              <button type="button" className="clear-media" onClick={clearMedia}>
                <FaTimes />
              </button>
            )}
          </div>
        </div>

        {preview && (
          <div className="media-preview">
            {formData.mediaType === "image" ? (
              <img
                src={preview}
                alt="Preview"
                onError={() => {
                  setPreview(null);
                  toast.error("Failed to load image preview");
                }}
              />
            ) : (
              <video
                src={preview}
                controls
                onError={() => {
                  setPreview(null);
                  toast.error("Failed to load video preview");
                }}
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="12"
            placeholder="Write your post content here..."
            maxLength={65535}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}