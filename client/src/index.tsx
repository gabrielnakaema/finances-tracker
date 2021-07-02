import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { NotificationProvider } from './contexts/NotificationContext';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NotificationProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NotificationProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
