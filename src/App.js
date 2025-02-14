// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import FormLoginPage from './pages/Login';
import RegisterPage  from './pages/Register';
import ProfilePage from './pages/Profile';
import { FixedTabHomeComponent } from './components/FixedTabHome';
import AboutPage from './pages/About';
import SaveRecipes from './pages/SaveRecipes';
import RecipeDetail from './pages/ResepDetail';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/FormLogin" element={<FormLoginPage />} />
                <Route path="/FormRegister" element={<RegisterPage />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/FixedTabHome" element={<FixedTabHomeComponent />} />
                <Route path="/About" element={<AboutPage />} />
                <Route path="/SaveRecipes" element={<SaveRecipes/>} />
                <Route path="/detail/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
}

export default App;