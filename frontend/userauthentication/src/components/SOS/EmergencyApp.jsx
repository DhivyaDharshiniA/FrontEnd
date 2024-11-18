// App.js
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LocationSender from "./LocationSender";
import ManageContacts from "./ManageContacts";
import SuccessPage from "./SuccessPage";
export default function EmergencyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationSender></LocationSender>}></Route>
        <Route path="/manage-contacts" element={<ManageContacts />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}
export { EmergencyApp };
