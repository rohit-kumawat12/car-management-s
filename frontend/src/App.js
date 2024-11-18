import './App.css';
import Home from './components/Home';
import About from './components/About';
import Background from './components/Background';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Background />
          <Navbar />
          <div> 
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
              <Route exact path="/profile" element={<Profile />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
