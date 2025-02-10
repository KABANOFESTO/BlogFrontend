import "../components/style/Hero.css";
import helloImage from "../Images/maureen.png";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <>
      <div id="hero" className="hero-section">
        <div className="container">
          <p>Welcome To
          </p>
          <h1>Heartfelt<span className="span">Growth</span>!</h1>
          <br />
          <p>
            Life’s journey can sometimes feel overwhelming, but with<br />
            kindness, faith,and a commitment to growth, we believe <br />
            everyone can unlock their full potential. <br /><br />
            Our mission is to inspire purposeful living, promote <br />
            compassion and help you believe in yourself and the power of faith.<br />
            Through self-discovery, mental wellness, and kindness, we can<br />
            all create positive change in our lives and the world.<br />
            Wherever you are on your journey, you'll find stories, insights, and tips to help you live <br />
            with positivity, connection, and selflove. Together, we will grow, inspire, and make<br />
            the world a kinder place.<br /><br />
            Let’s grow. Let’s be kind. Let’s inspire.📖
          </p><br />
          <i class="fa fa-long-arrow-down" aria-hidden="true"></i>
          <div className="row" style={{ marginTop: '-1cm' }}>
            <div className="col-md-6">

            </div>
            <Link to="/contact">
              <button className="btns login" style={{ marginTop: '0.2cm', width: '4cm' }}>Contact Me</button>
            </Link>

            <Link to="/blogs" >
              <button className="btns login" style={{ marginTop: '0.2cm', width: '4cm' }}>Blogs</button>
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
