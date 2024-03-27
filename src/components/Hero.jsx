import "../components/style/Hero.css";
import helloImage from "../Images/maureen.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <>
      <div id="hero" className="hero-section">
        <div className="container">
          <p>Hello and welcome to Visit MeDaily! 🌟</p>
          <h1>Visit Me<span className="span"> Daily</span>.</h1>
          <p>
          We're delighted to have you here. Whether you're <br />
          exploring our latest blog posts or seeking valuable <br />
          insights, we hope your journey with us is both informativebr
           and enjoyable. If you have any questions or if there's anything <br />
           specific you're looking for, feel free to reach out. Happy reading! 📖✨
          </p>
          <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
          <div className="row"style={{marginTop:'-1cm'}}>
            <div className="col-md-6">
              
            </div>
               <Link to="/contact">
              <button className="btns login" style={{marginTop:'0.2cm',width:'4cm'}}>Contact Me</button>
            </Link>

            <Link to="/blogs" >
              <button className="btns login" style={{marginTop:'0.2cm',width:'4cm'}}>Blogs</button>
            </Link>
          </div>
       
        </div>
        <br />
        <div className="image">
          <img src={helloImage} alt="" />
        </div>
      </div>
    </>
  );
}
