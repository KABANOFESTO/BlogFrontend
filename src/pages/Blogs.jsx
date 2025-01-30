import ArticleBlog from "../components/ArticleBlog";
import HeroPage from "../components/HeroPage";
import { useState, useEffect } from "react";
import axios from "axios";
import "../components/style/contact.css";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastFetchTime, setLastFetchTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all"
        );
        const data = response.data.data.sort((a, b) => b.id - a.id);
        localStorage.setItem("blogData", JSON.stringify(data));
        setBlogs(data);
        setLoading(false);
        setLastFetchTime(Date.now()); // Record the timestamp of the last data fetch
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    const storedData = localStorage.getItem("blogData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setBlogs(parsedData);
      setLoading(false);
      setLastFetchTime(Date.now()); // Update the last fetch time from local storage
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const response = await axios.head(
          "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all"
        );
        const serverLastModified = new Date(response.headers["last-modified"]).getTime();
        if (serverLastModified > lastFetchTime) {
          // If server data is updated after the last fetch, fetch new data
          const fetchDataResponse = await axios.get(
            "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all"
          );
          const newData = fetchDataResponse.data.data;
          localStorage.setItem("blogData", JSON.stringify(newData));
          setBlogs(newData);
          setLastFetchTime(Date.now()); // Update the last fetch time
        }
      } catch (error) {
        console.error("Error checking for updates:", error);
      }
    };

    const intervalId = setInterval(checkForUpdates, 60000); // Check for updates every minute

    return () => clearInterval(intervalId);
  }, [lastFetchTime]);

  return (
    <>
      <HeroPage title={"Blogs"} />
      {loading && (
        <div className="Loader container">
          <PropagateLoader
            color="#ffd369"
            cssOverride={{}}
            loading
            size={20}
            speedMultiplier={1}
          />
        </div>
      )}
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      </div>
      <br />
      <div className="Articles-section container">
        {blogs.map((post, index) => (
          <ArticleBlog
            key={index}
            Id={post.id}
            title={post.postTitle}
            image={post.postImage}
            desc={post.postContent}
            profile={post.postedBy.profile}
            fullname={post.postedBy.firstName + " " + post.postedBy.lastName}
            views={post.views}
            likes={post.allLikes}
            comments={post.allComents}
            data={post.createdAt}
          />
        ))}
      </div>
    </>
  );
}
