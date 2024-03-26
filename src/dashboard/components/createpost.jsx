import React from "react";
import "../components/style/modal.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Link } from "react-router-dom";

function CreatePost({ closeModal }) {
  const errors = () => {
    toast.error("Failed to create post", {
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
    toast.success("Post created Successfully", {
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
    postImage: "",
    postTitle: "",
    postContent: "",
  });
  const handleInput = (event) => {
    if (event.target.name === "postImage") {
      setPost({ ...post, postImage: event.target.files[0] });
    } else {
      setPost({ ...post, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("postImage", post.postImage);
    formData.append("postTitle", post.postTitle);
    formData.append("postContent", post.postContent);

    const apiKey = localStorage.getItem("token");

    axios
      .post(
        "https://blogbeckend.onrender.com/PostgreSQL/API/posts/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        success();
      })
      .catch((error) => {
        console.error(error);
        errors();
      });
  };

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleClose-btn">
            <button onClick={() => closeModal(false)}>X</button>
          </div>
          <div className="modal-title">
            <h2>Create a post here!</h2>
            {/* <Link to={`/addvideo/`}>
  <p>add video post</p>
</Link> */}
          </div>
          <form action="#" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div>
                <label class="file">
                  <input
                    type="file"
                    id="file"
                    name="postImage"
                    accept="image/*"
                    aria-label="File browser example"
                    onChange={handleInput}
                  />
                  <span class="file-custom"></span>
                </label>
              </div>
              <div>
                <input
                  type="text"
                  name="postTitle"
                  onChange={handleInput}
                  placeholder="Post Title"
                />
              </div>
              <div className="editor">
                <CKEditor
                placeholder={"Enter post descriptions"}
                  editor={ClassicEditor}
                  data={setPost?.postContent}
                  onReady={(editor) => {
                    console.log("Editor is ready to use!", editor);
                  }}
                  name="content"
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setPost({ ...post, postContent: data });
                  }}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button name="submit">Publish</button>
              <button id="cancelbtn" onClick={() => closeModal(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default CreatePost;
