import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SideNav } from "../components/side-nav/SideNav";
import { Overview } from "./Overview";
import { Nodes } from "./Nodes";
import Applications from "./applications/Applications";
import { Breadcrumbs } from "../components/Breadcrumbs";

function Home() {
  return (
    <BrowserRouter>
      <div className={"flex"}>
        <SideNav />
        <div className={"flex h-screen flex-1 flex-col pt-5 pb-5 pl-10 pr-10"}>
          <Breadcrumbs />
          <div className={"mt-5 flex-1 overflow-y-scroll"}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/nodes" element={<Nodes />} />
              <Route path="/applications/*" element={<Applications />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default Home;
