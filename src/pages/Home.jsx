import ArticleBlog from "../components/ArticleBlog";
import Hero from "../components/Hero";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [ispending, setIsPending] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        "https://blog-backend-6y0w.onrender.com/PostgreSQL/API/posts/get/all"
      );
      const data = response.data.data;
      setBlogs(data);
      setIsPending(false);
    };
    getData();
  }, []);
  return (
    <>
      <Hero />
    </>
  );
}
