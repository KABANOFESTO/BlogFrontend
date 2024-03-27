import HeroPage from "../components/HeroPage";
import { useState } from "react";
// import video1 from "../Images/abaut.jpg";
import Image from "../Images/picv.jpg";
import "../components/style/about.css";
export default function Team() {
  const [paragraphy, setParagraphy] = useState(
    `A mission statement is a short summary of an organization’s core purpose, focus, and aims. This usually includes a brief description of what the organization does and its key objectives.`
  );

  const handleMission = () => {
    setParagraphy(
      `A mission statement is a short summary of an organization’s core purpose, focus, and aims. This usually includes a brief description of what the organization does and its key objectives.`
    );
  };
  const handleVision = () => {
    setParagraphy(
      `A vision statement is a short description of an organization’s aspirations and the wider impact it aims to create. It should be a guiding beacon to everyone within the organization and something which underpins internal decision-making and determines the intended direction of the organization.`
    );
  };
  const handleValue = () => {
    setParagraphy(
      `Everything we do – from our Conferences to our TED Talks to the projects sparked by The Audacious Project, from the global TEDx community to the TED-Ed lesson series – is driven by this goal: How can we best spread great ideas?`
    );
  };

  return (
    <>
      <HeroPage title={"About Me"} />
      <br />

      <div className="about-section container">
        <div className="about-row">
          <div className="about-video">
            <div className="play-btn">
              <span className="Play-icon">
                <iconify-icon icon="fe:play"></iconify-icon>
              </span>
            </div>
            {/* <img src={video1} alt="our services" /> */}
            <img src={Image} alt="our services" />
          </div>
          <div className="about-info">
            <div className="about-heading">
              <p className="sub-heading">Visit Me<span className="span"> Daily</span>.</p>
              <h2>We give you the best articles you want.</h2>
              <p className="about-desc">
                Far far away, behind the word mountains, far from the countries
                Vokalia and Consonantia
              </p>
            </div>
            <div className="tabulation">
              <ul>
                <li onClick={handleMission}>My Mission</li>
                <li onClick={handleVision}>My Vision</li>
                <li onClick={handleValue}>My Value</li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane">
                <p>{paragraphy}</p>
              </div>
            </div>
          </div>
        </div>
     
      </div>
    </>
  );
}
