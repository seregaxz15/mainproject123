import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./components/Registration";
import './App.css'
import ChecksList from "./components/ChecksList";
import CheckDetails from "./components/CheckDetails";
import SignIn from "./components/SignIn";
import CheckForm from "./components/CheckForm";

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Registration/>}/>
                  <Route path="/checks" element={<ChecksList/>}/>
                  {/* <Route path="/:id" element={<CheckDetails />} /> */}
                  <Route path="/create" element={<CheckForm />} />
              </Routes>
          </div>
      </Router>
  )
}

export default App;