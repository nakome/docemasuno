import React from "react";
import { Link } from "wouter";

export default function LinkTo(props) {
  return (
    <Link
      href={`/find/${encodeURIComponent(props.query)}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      {props.name}
    </Link>
  );
}
