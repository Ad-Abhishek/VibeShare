import './App.css';
import CreatePost from './home/components/CreatePost';
import Home from './home/components/Home';
import NavBar from './layout/NavBar';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/create" element={<CreatePost />} />
        </Routes>
      </div>
  );
}

export default App;
