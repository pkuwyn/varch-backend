import React from "react";
import logo from "./assets/logo.svg";

export default function Logo(props) {
  return (
    <img
      src={logo}
      alt="logo"
      style={{
        maxWidth: "200px",
        maxHeight: "200px",
      }}
    />
  );
}
