import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import RecruiterLogin from "./components/RecruiterLogin.jsx";
import { AppContext } from "./context/AppContext.jsx";
import Application from "./pages/Application.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
import Home from "./pages/Home.jsx";

const App = () => {
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/application" element={<Application />} />
      </Routes>
    </div>
  );
};

export default App;
