import { UserProvider } from "./contexts/UserContext";
import Users from "./components/Users";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// import ReactDom from 'react-dom/client';
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";

import "./App.css";
import Articles from "./components/Articles";
import Topics from "./components/Topics";
import User from "./components/Users";

function App() {
  return (
    <>
      <UserProvider>
        <div className="Sticky-fixed-header-container"> 
        <Header />
        <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/topics" element={<Topics />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
