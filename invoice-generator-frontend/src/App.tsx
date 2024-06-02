// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/index';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AddProductPage from './pages/AddProductPage';
import GeneratePDFPage from './pages/GeneratePDFPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const token = localStorage.getItem('token');

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    {token ? (
                        <>
                            <Route path="/" element={<Navigate to="/add-product" />} />
                            <Route path="/register" element={<Navigate to="/add-product" />} />
                            <Route path="/add-product" element={<AddProductPage />} />
                            <Route path="/generate-pdf" element={<GeneratePDFPage />} />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<LoginPage />} />
                            <Route path="/register" element={<RegistrationPage />} />
                            <Route path="/add-product" element={<Navigate to="/" />} />
                            <Route path="/generate-pdf" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
                <ToastContainer />
            </Router>
        </Provider>
    );
}

export default App;
