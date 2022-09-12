import Login from './components/Login'
// import './App.css';
import Home from './components/Home'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
      </BrowserRouter>
      {/* <Login/> */}
    </>
  );
}

export default App;
