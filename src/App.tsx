import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Posts from "./pages/Posts";
import Post from "./pages/Post";
import Padrinhos from "./pages/Padrinhos";
import Damas from "./pages/Damas";
import Presentes from "./pages/Presentes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/padrinhos" element={<Padrinhos />} />
        <Route path="/damas" element={<Damas />} />
        <Route path="/lista-de-presentes" element={<Presentes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
