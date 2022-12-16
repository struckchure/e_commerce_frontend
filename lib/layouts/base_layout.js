import React from "react";
import { useIsFetching } from "react-query";
import Loader from "../components/loader";
import Navbar from "../components/navbar";
import Container from "./container";

function BaseLayout({ children, isLoading }) {
  const isFetching = useIsFetching();

  return (
    <main className="bg-gray-900">
      {isLoading || isFetching ? <Loader /> : null}
      {children}
    </main>
  );
}

export default Object.assign(BaseLayout, { Navbar, Container, Loader });
