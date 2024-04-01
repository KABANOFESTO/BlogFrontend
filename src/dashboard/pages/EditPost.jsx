import "../components/style/editpost.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function EditPost() {
  const [loading, setLoading] = useState(false); // State to track loading status

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
    toast.success("Post updated successfully", {
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

  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://blogbeckend.onrender.com/PostgreSQL/API/posts/single/post/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  function handleUpdate(event) {
    event.preventDefault();
    setLoading(true); // Set loading to true when the request starts
    const formData = new FormData();
    formData.append("postImage", data.postImage);
    formData.append("postTitle", data.postTitle);
    formData.append("postContent", data.postContent);
    const apiKey = localStorage.getItem("token");
    axios
      .put(
        `https://blogbeckend.onrender.com/PostgreSQL/API/posts/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setLoading(false); // Set loading to false when the request is complete
        success();
        console.log(res.data.posts)

        localStorage.removeItem("postsData");
        localStorage.removeItem("blogData");

        const data = res.data.posts.sort((a, b) => b.id - a.id);
        localStorage.setItem("blogData", JSON.stringify(data));

        localStorage.setItem("postsData", JSON.stringify(data));


      });
  }
  const navigate = useNavigate("");
  return (
    <div className="edit-section container-section">
      <div className="modalContainer">
        <div className="modal-title">
          <h2>Edit post here!</h2>
        </div>
        <form onSubmit={handleUpdate}>
          <div className="modal-body">
            <div>
              <input
                type="text"
                name="id"
                value={data.id}
                placeholder="Post Title"
                disabled
              />
            </div>
            <div>
              <label class="file">
                <input
                  type="file"
                  id="file"
                  name="blogImage"
                  accept="image/*"
                  aria-label="File browser example"
                  onChange={(e) => {
                    setData({ ...data, postImage: e.target.files[0] });
                  }}
                />
                <span class="file-custom"></span>
              </label>
            </div>
            <div>
              <input
                type="text"
                name="title"
                value={data.postTitle}
                placeholder="Post Title"
                onChange={(e) => {
                  setData({ ...data, postTitle: e.target.value });
                }}
              />
            </div>
            <div>
              <CKEditor
                editor={ClassicEditor}
                data={data.postContent}
                name="content"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setData({ ...data, postContent: data });
                }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button name="submit" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button> {/* Disable the button when loading */}
            <button
              onClick={() => {
                navigate("/post");
              }}
              id="cancelbtn"
              disabled={loading} // Disable the button when loading
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
