import React from "react";
import Calles from "./Components/Calles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/Components" element={<callesAgregar/>} />
                <Route exact path="/Components" element={<callesMostrar/>} />
            </Routes>
        </Router>
    );
}

export default App;
