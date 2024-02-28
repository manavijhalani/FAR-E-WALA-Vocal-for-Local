import './App.css';
import SignUp from './signup';
import Seller from './signup1';
import Home from './home';
import TitlebarImageList from './category.js';
import BasicTabs from  './tab.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup1" element={<Seller />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tab" element={<BasicTabs/>}/>    
          <Route path="/category" element={<TitlebarImageList/>}/>    
          <Route path="/" element={<Home />} /> {/* Route for the home page */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
