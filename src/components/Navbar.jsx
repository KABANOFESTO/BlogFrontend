import "../components/style/Navbar.css";
import { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = { clicked: false };
  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };
  render() {
    return (
      <>
        <nav>
          <Link to="/" className="tag logo">
            <h1>Visit Me<span className="span"> Daily</span>.</h1>
          </Link>
          <div>
            <ul
              id="navbar"
              className={this.state.clicked ? "#navbar active" : "#navbar"}
            >
              <li>
                <Link to="/" className="tag active">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="tag">
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="tag">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/quotes" className="tag">
                  Quotes
                </Link>
              </li>
              <li>
                <Link to="/contact" className="tag">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Link to="/login">
              <button className="btn login">Join Me</button>
            </Link>
          </div>
          <div id="mobile" onClick={this.handleClick}>
            <i
              id="bar"
              className={this.state.clicked ? "fa fa-times" : "fa fa-bars"}
            ></i>
          </div>
        </nav>
      </>
    );
  }
}
export default Navbar;
