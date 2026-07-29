import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import Navbar from "./components/Navbar";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";

function App(){

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/create" element={<CreatePost />} />

        <Route path="/post/:id" element={<PostDetails />} />

        <Route path="/edit/:id" element={<EditPost />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>

    </BrowserRouter>
  );

}


export default App;