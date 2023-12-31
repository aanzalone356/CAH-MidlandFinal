import LoginPage from "./components/LoginPage.jsx"
// import RegisterPage from "./components/RegisterPage.jsx"
import './App.css';
import React from 'react';
import About from './components/About/About.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Lobby from "./components/LobbyPage.jsx";
import GamePage from "./components/GamePage.jsx";
import { WhiteCardDisplay } from "./cards/CardDisplay.jsx";
import GameDisplay from "./components/GameDisplay.jsx";



function App() {
  return (
    <Router className="App">
      <NavBar/>
      <Routes>
        <Route path='/' exact element={<LoginPage/>}/>
        <Route path="/lobbypage" element={<Lobby/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/gamepage" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
