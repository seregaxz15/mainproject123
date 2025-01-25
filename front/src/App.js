import React from "react";
import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom";

import Registration from "./components/Registration";
import './App.css'
import ChecksList from "./components/ChecksList";
import CheckDetails from "./components/CheckDetails";
import SignIn from "./components/SignIn";
import CheckForm from "./components/CheckForm";
import Header from "./components/Header";
import {ChecksContextProvider} from "./CheckContext";
import History from "./components/History";

function App() { // TODO: remove redirect, work with Header

    return (
        <ChecksContextProvider>
            <Router>
                <AppRoutes />
            </Router>
        </ChecksContextProvider>
    );
}

function AppRoutes() {
    const location = useLocation();

    // Условный рендеринг Header, если текущий маршрут не / (страница регистрации)
    const shouldShowHeader = location.pathname !== "/";

    return (
        <div className="App">
            {shouldShowHeader && <Header />}
            <Routes>
                <Route path="/" element={<Registration />} />
                <Route path="/checks" element={<ChecksList />} />
                <Route path="/checks/:id" element={<CheckDetails />} />
                <Route path="/create" element={<CheckForm />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </div>
    );
}

export default App;
