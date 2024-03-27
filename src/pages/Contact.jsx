import "../components/style/contact.css";
import HeroPage from "../components/HeroPage";
export default function Contact() {
  return (
    <>
      <HeroPage title={"Contact"} />
      <div className="contact-section container">
        <div className="contact-info">
          <div className="contact-title">
            <h1>Contact Information</h1>
          </div>
          <div className="contact-content">
            <div className="address">
              <p>Address:  Kigali/Kacyiru</p>
            </div>
            <div>
              <p>
                Phone: <span className="bold">+250 785651518</span>
              </p>
            </div>
            <div>
              <p>
                Email: <span className="bold">maureekalala@gmail.com </span>
              </p>
            </div>
            <div>
              <p>
                Website: <span className="bold"><a href="https://maureen-two.vercel.app/" target="_blank" rel="noopener noreferrer">maureen web</a></span>
              </p>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <div className="contact-map">
          <iframe
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=kacyiru RBA&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              width="100%"
              height="90%"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="contact-form-groupe">
            <form>
              <div className="form-groupe">
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-groupe">
                <input type="text" placeholder="Your Email" />
              </div>
              <div className="form-groupe">
                <input type="text" placeholder="Subject" />
              </div>
              <div className="form-groupe">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                ></textarea>
              </div>
              <div className="form-groupe">
                <button className="send-btn">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    
    </>
  );
}
