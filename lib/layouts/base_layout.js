import React from "react";
import Navbar from "../components/navbar";

function BaseLayout({ children }) {
  return <main className="bg-gray-900">{children}</main>;
}

export default Object.assign(BaseLayout, { Navbar });
