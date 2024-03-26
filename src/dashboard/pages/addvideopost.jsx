import "../components/style/editpost.css";
import axios from "axios";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate();

  const errors = (message) => {
    toast.error(message || "Failed to update post", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const success = () => {
    toast.success("Post added successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [post, setPost] = useState({
    video: "",
    postTitle: "",
    postContent: "",
  });

  const handleInput = (event) => {
    if (event.target.name === "video") {
      setPost({ ...post, video: event.target.files[0] });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("video", post.video);
    formData.append("postTitle", post.postTitle);
    formData.append("postContent", post.postContent);

    const apiKey = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "https://blogbeckend.onrender.com/PostgreSQL/API/posts/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      success();
    } catch (error) {
      console.error(error);
      errors(error.response?.data?.message);
    }
  };

  return (
    <div className="edit-section container-section">
      <div className="modalContainer">
        <div className="modal-title">
          <h2>create video post here!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div>
              <label className="file">
                <input
                  type="file"
                  id="file"
                  name="video"
                  accept="video/*"
                  aria-label="File browser example"
                  onChange={handleInput}
                />
                <span className="file-custom"></span>
              </label>
            </div>
            <div>
              <input
                type="text"
                name="postTitle"
                value={post.postTitle}
                placeholder="Post Title"
                onChange={handleInput}
              />
            </div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={post.postContent}
                name="content"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setPost({ ...post, postContent: data });
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button name="submit">Update</button>
            <button
              onClick={() => {
                navigate("/post");
              }}
              id="cancelbtn"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditPost;
