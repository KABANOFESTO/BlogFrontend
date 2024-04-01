import "../components/style/signup.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const errors = () => {
    toast.error("Failed to create account", {
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
    toast.success("User registered successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const handleRegister = async () => {
    setLoading(true); // Set loading to true when request starts
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profile", profile);

      const result = await axios.post(
        "https://blogbeckend.onrender.com/PostgreSQL/API/users/signUp",
        formData
      );
      success();
      console.log(result.data);
      navigate("/Login");
    } catch (err) {
      errors();
      console.error(err);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <>
      <div className="sign-section container">
        <div className="sign-container">
          <h4>
            Vist Me Daily<span className="span"> Create</span> Account
          </h4>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="file"
            className="file_img"
            onChange={(e) => setProfile(e.target.files[0])}
          />
          <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p>
            Already have an account?{" "}
            <Link to="/Login">
              <span className="link">Login Here</span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
