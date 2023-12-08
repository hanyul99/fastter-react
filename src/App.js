
import React from 'react'; // Add this line to import React
import './App.css';
import Feed from './components/Feed';
import LoginPage from './pages/LoginPage';
import FeedDetail from './components/FeedDetail';
import CreateFeed from './components/FeedCreate';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/NavBar';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={
            <>
              <Feed />
            </>
          }/>
          <Route path="/login" element={<><LoginPage /></>} />
          <Route path="/signup" element={<><SignupPage /></>} />
          {/* 여기에 추가적인 경로(Route)를 추가할 수 있습니다. */}
          <Route path="/feed/create" element={<><CreateFeed /></>} />
          <Route path="/feed/:feedId" element={<><FeedDetail /></>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
