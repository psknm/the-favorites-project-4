import {Route, Routes, Link, BrowserRouter as Router} from 'react-router-dom';
import Home from './components/Home';
import Drivers from './components/Drivers'
import Cars from './components/Cars'
import Tracks from './components/Tracks';
import Teams from './components/Teams';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navBar">
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/drivers">Drivers</Link>
            </li>
            <li>
              <Link to="/cars">Cars</Link>
            </li>
            <li>
              <Link to="/tracks">Tracks</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
          </ul>
        </nav>
      </div>

    <div>
      <Routes>
        <Route path="/" element={<Home />}/ >
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/teams" element={<Teams />} />
      </Routes>
    </div>

    </Router>

  )
}



export default App;