import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Registration from "./components/Registration";
import './App.css'
import ChecksList from "./components/ChecksList";
import CheckDetails from "./components/CheckDetails";
import SignIn from "./components/SignIn";
import CheckForm from "./components/CheckForm";
import Header from "./components/Header";
import {ChecksContextProvider} from "./CheckContext";

function App() { // TODO: remove redirect, work with Header
  return (
      <ChecksContextProvider>
          <Router>
              <div className="App">
                  <Header/>
                  <Routes>
                      {/*<Route path="/" element={<Registration/>}/>*/}
                      <Route path="/checks" element={<ChecksList />}/>
                      {/*<Route path="/checks/:id" element={<CheckDetails />} />*/}
                      <Route path="/create" element={<CheckForm />} />
                  </Routes>
              </div>
          </Router>
      </ChecksContextProvider>
  )
}

export default App;