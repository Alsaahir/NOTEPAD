import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";

import Header from './components/Header';
import NotesPage from './pages/NotesPage';
import NotePage from './pages/NotePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </div>

      
    </Router>
  );
}

export default App;
