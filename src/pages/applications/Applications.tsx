import React from "react";
import { Route, Routes } from "react-router-dom";
import { AllApplications } from "./AllApplications";
import { ApplicationWithName } from "./ApplicationWithName";

function Home() {
  return (
    <Routes>
      <Route index element={<AllApplications />} />
      <Route path=":name" element={<ApplicationWithName />} />
    </Routes>
  );
}

export default Home;
