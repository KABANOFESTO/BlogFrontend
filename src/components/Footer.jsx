import "../components/style/footer.css";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <>
      <div className="footer container">
        <div className="footer-content">
          <div className="footer-row">
            <div className="readit">
              <div className="title">
                <h4 className="mark">
                  Visit Me<span className="span"> Daily</span>.
                </h4>
              </div>
              <div className="readit-body">
                <p style={{ textAlign: "" }}>
                  We're delighted to have you here.
                  Whether you're exploring our
                  latest blog posts or seeking
                  valuable insights, we hope your
                  journey with us is both
                  informative and enjoyable.
                </p>
              </div>
              <div className="readit-footer">
                <div className="f-social-icons">
                  <div className="twitter">
                    <a href="https://twitter.com/MaureenUmwiza1">
                      <span>
                        <iconify-icon icon="ri:twitter-fill"></iconify-icon>
                      </span>
                    </a>
                  </div>
                  <div className="facebook">
                    <a href="https://web.facebook.com/maureen.kalala.9?locale=hi_IN">
                      <span>
                        <iconify-icon icon="ri:facebook-fill"></iconify-icon>
                      </span>
                    </a>
                  </div>
                  <div className="instagram">
                    <a href="https://www.instagram.com/maureekalala/">
                      <span>
                        <iconify-icon icon="bi:instagram"></iconify-icon>
                      </span>
                    </a>
                  </div>
                  <div className="youtube">
                    <a href="#">
                      <span>
                      <iconify-icon icon="bi:youtube"></iconify-icon>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="latest-news">
              <div className="title">
                <h4>Latest News</h4>
              </div>
              <div className="latest-body">
                <p>You can like unlike, and comment on postBut you will need to login first</p>
                <p>If no account register to create new one</p>
              </div>
            </div>
            <div className="info">
              <div className="title">
                <h4>Informtion</h4>
              </div>
              <div className="info-body">
                <ul>
                  <li className="tag">
                    <Link to="/">
                      <span>
                        <iconify-icon icon="grommet-icons:form-next"></iconify-icon>
                      </span>{" "}
                      Home
                    </Link>
                  </li>
                  <li className="tag">
                    <Link to="/team">
                      {" "}
                      <span>
                        <iconify-icon icon="grommet-icons:form-next"></iconify-icon>
                      </span>{" "}
                      About
                    </Link>
                  </li>
                  <li className="tag">
                    <Link to="/login">
                      {" "}
                      <span>
                        <iconify-icon icon="grommet-icons:form-next"></iconify-icon>
                      </span>{" "}
                      Join Me
                    </Link>
                  </li>
                  <li className="tag">
                    <Link to="/blogs">
                      {" "}
                      <span>
                        <iconify-icon icon="grommet-icons:form-next"></iconify-icon>
                      </span>{" "}
                      Blogs
                    </Link>
                  </li>
                  <li className="tag">
                    <Link to="/contact">
                      {" "}
                      <span>
                        <iconify-icon icon="grommet-icons:form-next"></iconify-icon>
                      </span>{" "}
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="question">
              <div className="title">
                <h4>Addresses</h4>
              </div>
              <div className="q-body">
                <div className="location flex-content">
                  <div className="icon">
                    <span>
                      <iconify-icon icon="mdi:location"></iconify-icon>
                    </span>
                  </div>
                  <div>
                    <p>
                      Kigali Kacyiru
                    </p>
                  </div>
                </div>
                <div className="phone flex-content">
                  <div className="icon">
                    <span>
                      <iconify-icon icon="mingcute:phone-fill"></iconify-icon>
                    </span>
                  </div>
                  <div>
                    <p>+250 785651518</p>
                  </div>
                </div>
                <div className="email flex-content">
                  <div className="icon">
                    <span>
                      <iconify-icon icon="bi:envelope-fill"></iconify-icon>
                    </span>
                  </div>
                  <div>umwizamaureen@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="copyright">
            <p>
              Copyright umwizamaureen©2024 All rights reserved
            </p>
            <a href="#hero">
              <div className="back-top">
                <iconify-icon icon="mdi:arrow-top-circle"></iconify-icon>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
