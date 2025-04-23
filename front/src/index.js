
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import { BrowserRouter, Link } from 'react-router-dom';


import './styles/colors.css';
import './styles/global.css';
import App from './App';

axios.defaults.withCredentials = true;

axios.defaults.baseURL = 'http://localhost:7981';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
