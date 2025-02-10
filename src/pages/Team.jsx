import HeroPage from "../components/HeroPage";
import { useState } from "react";
// import video1 from "../Images/abaut.jpg";
import Image from "../Images/picv.jpg";
import "../components/style/about.css";
export default function Team() {

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
          <div className="about-info" >
            <div className="about-heading" style={{alignItems:"center"}}>
              <p className="sub-heading">Heartfelt<span className="span"> Growth</span></p>
              <h2>Hello Welcome.
              </h2>
              <p className="about-desc">
                My name is Maureen UMWIZA and am deeply passionate about personal <br />
                commitment to growth, we believe everyone can unlock their full potential. <br />
                growth, kindness, and the power of faith. I believe in embracing our authentic selves,<br />
                cultivating compassion, and living with purpose. Through Heartfelt Growth, I aim to<br />
                inspire others to grow positively, connect with their true potential, and spread love and  kindness in everything they do.
              </p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
