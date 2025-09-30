// client/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // From previous steps
import Home from './pages/Home/Home'; // Example: Adjust pathsko
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard'; // Example
import ProtectedRoute from './components/common/ProtectedRoute'; // From previous steps

function App() {
  return (
    <AuthProvider> {/* Wrap with AuthProvider for auth context */}
      <div className="App"> {/* Optional: Your layout */}
        {/* Add Header or other global components here if in layout/ */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Example home route */}
          <Route path="/login" element={<Login />} /> {/* Paste this line here */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> {/* Example protected route */}
          {/* Add more routes for other pages like Profile */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
