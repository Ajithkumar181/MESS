import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { FaPlus, FaList, FaUser, FaCogs, FaTachometerAlt } from 'react-icons/fa'; 
import AddClient from './components/AddClient'; 
import DisplayClient from './components/DisplayClient'; 
import AddMaterial from './components/AddMaterial'; 
import DisplayMaterial from './components/DisplayMaterial'; 
import AddProject from './components/AddProject'; 
import DisplayProject from './components/DisplayProject'; 
import Dashboard from './components/Dashboard'; 
import './App.css'; // Correct relative path
import Displaycontractor from './components/Displaycontractor';
import Addcontractor from './components/Addcontractor';
import Addpayment from './components/Addpayment';
import Displaycontractorpayment from './components/Displaycontractorpayment';
import Cpayment from './components/Cpayment';
import Cproject from './components/Cproject';
function App() {
  return (
    <Router>
      {/* Navigation Links */}
      <nav style={{ display: 'flex', justifyContent: 'center', padding: '10px', flexWrap: 'wrap' }}>
        <Link to="/" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaTachometerAlt size={24} style={{ marginRight: '5px' }} /> DashBoard
        </Link>
        <Link to="/add-client" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaUser size={24} style={{ marginRight: '5px' }} /> Add Client
        </Link>
        <Link to="/display-client" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaList size={24} style={{ marginRight: '5px' }} /> Display Client
        </Link>
        <Link to="/add-material" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaPlus size={24} style={{ marginRight: '5px' }} /> Add Material
        </Link>
        <Link to="/display-material" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaCogs size={24} style={{ marginRight: '5px' }} /> Display Material
        </Link>
        <Link to="/add-project" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaPlus size={24} style={{ marginRight: '5px' }} /> Add Project
        </Link>
        <Link to="/display-project" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaList size={24} style={{ marginRight: '5px' }} /> Display Project
        </Link>
        <Link to="/add-contractor" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaPlus size={24} style={{ marginRight: '5px' }} /> Add Contractor
        </Link>
        <Link to="/display-contractor" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaList size={24} style={{ marginRight: '5px' }} /> Display Contractor
        </Link>
        <Link to="/add-payment" style={{ marginRight: '20px', textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
          <FaPlus size={24} style={{ marginRight: '5px' }} /> Add Payment
        </Link>
        <Link to="/display-contractor-payment" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
        <FaList size={24} style={{ marginRight: '5px' }} /> Display Contractor Payment
        </Link>
        <Link to="/C-payment" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center' }}>
        <FaList size={24} style={{ marginRight: '5px' }} /> Payment
        </Link>
        <Link to="/client">client-project</Link>
        
      </nav>

      {/* Define Routes */}
      <Routes>
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/display-client" element={<DisplayClient />} />
        <Route path="/add-material" element={<AddMaterial />} />
        <Route path="/display-material" element={<DisplayMaterial />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/display-project" element={<DisplayProject />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-contractor" element={<Addcontractor />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} /> {/* Fallback Route */}
        <Route path="/display-contractor" element={<Displaycontractor />} />
        <Route path="/add-payment" element={<Addpayment />} />
        <Route path="/display-contractor-payment" element={<Displaycontractorpayment />} />
        <Route path="/C-payment" element={<Cpayment/>} />
        <Route path="/client" element={<Cproject/>} />
      </Routes>
    </Router>
  );
}

export default App;