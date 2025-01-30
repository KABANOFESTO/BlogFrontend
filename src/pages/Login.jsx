import "../components/style/login.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  const errors = () => {
    toast.error("Please enter valid credential", {
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
    toast.success("Login Successfully", {
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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = async () => {
    setLoading(true); // Set loading to true when request starts
    try {
      const result = await axios.post(
        `https://blog-backend-6y0w.onrender.com/PostgreSQL/API/users/login`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", result.data.token);
      const role = result.data.users.role;
      console.log(role);
      if (role === "admin") {
        success();
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        success();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      errors();
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <>
      <div className="Login-section container">
        <div className="login-container">
          <h1></h1>
          <h4>
            Vist Me<span className="span"> Daily</span>!! Welcome Back
          </h4>

          <input
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="Password"
          />
          <button onClick={handleApi} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p>
            Don't have any account?{" "}
            <Link to="/signup">
              <span className="link">Register Here</span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
