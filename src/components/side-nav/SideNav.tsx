import React from "react";
import { NavLink } from "./NavLink";
import { Sidebar } from "flowbite-react";

export function SideNav() {
  return (
    <div className={"min-h-screen w-fit border-r"}>
      <Sidebar>
        <Sidebar.Logo href="/" img="favicon.png" imgAlt="Ringleadr logo">
          Ringleadr
        </Sidebar.Logo>
        <Sidebar.ItemGroup>
          <NavLink to="/" label={"Overview"} />
          <NavLink to="/applications" label={"Applications"} />
          <NavLink to="/networks" label={"Networks"} />
          <NavLink to="/storage" label={"Storage"} />
          <NavLink to="/nodes" label={"Nodes"} />
        </Sidebar.ItemGroup>
      </Sidebar>
    </div>
  );
}
