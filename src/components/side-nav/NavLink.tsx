import { NavLink as RouterNavLink } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import React from "react";

export interface NavLinkProps {
  to: string;
  label: string;
}

export function NavLink(props: NavLinkProps) {
  return (
    <RouterNavLink to={props.to}>
      {({ isActive }) => (
        <Sidebar.Item active={isActive} as={"span"}>
          {props.label}
        </Sidebar.Item>
      )}
    </RouterNavLink>
  );
}
