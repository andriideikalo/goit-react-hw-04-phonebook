import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // закомітив, щоб не було дубляжу рендеру

  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
