import "./App.css";
import { Route, Routes } from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Team from "./pages/Team";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import BlogSingle from "./pages/BlogSingle";
import Notfound from "./pages/404-Page";
import DashLayout from "./dashboard/components/DashLayout";
import Dashboard from "./dashboard/pages/Dashboard";
import Post from "./dashboard/pages/Post";
import Pages from "./dashboard/pages/Pages";
import Inbox from "./dashboard/pages/Inbox";
import EditPost from "./dashboard/pages/EditPost";
import Video from "./dashboard/pages/addvideopost";
import Message from "./dashboard/pages/messages";
import { Users } from "./dashboard/pages/Users";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<Team />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="signup" element={<Signup />} />
         
          <Route path="blogSingle/:id" element={<BlogSingle />} />
          <Route path="*" element={<Notfound />} />
        </Route>
        <Route element={<DashLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/post" element={<Post />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="addvideo" element={<Video />} />
          <Route path="messages" element={<Message />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="editpost/:id" element={<EditPost />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
