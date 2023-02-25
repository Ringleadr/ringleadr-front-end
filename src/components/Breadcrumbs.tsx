import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import React from "react";
import { capitalizeFirstLetter } from "../api/utils";

export function Breadcrumbs() {
  let location = useLocation();
  let sections = location.pathname.split("/").filter((s) => s.length > 0);
  let breadcrumbs = [];
  let currentPath = "/";
  for (let i = 0; i < sections.length - 1; i++) {
    currentPath += sections[i];
    breadcrumbs.push(
      <Breadcrumb.Item
        key={`breadcrumb-${i}`}
        className={"decoration-gray-500 hover:underline hover:decoration-2"}
      >
        <Link to={currentPath}>{capitalizeFirstLetter(sections[i])}</Link>
      </Breadcrumb.Item>
    );
  }
  if (sections.length > 0) {
    breadcrumbs.push(
      <Breadcrumb.Item key={`breadcrumb-${sections.length - 1}`}>
        {capitalizeFirstLetter(sections[sections.length - 1])}
      </Breadcrumb.Item>
    );
  }
  return (
    <Breadcrumb>
      <Link to="/">
        <Breadcrumb.Item
          icon={HiHome}
          className={"decoration-gray-500 hover:underline hover:decoration-2"}
        >
          Home
        </Breadcrumb.Item>
      </Link>

      {breadcrumbs}
    </Breadcrumb>
  );
}
