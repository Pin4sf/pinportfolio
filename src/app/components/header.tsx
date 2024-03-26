import React from "react";
import { createClient } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import NavBar from "./Navbar";



export default async function Header() {
  const client = createClient("https://pinportfolio.cdn.prismic.io/api/v2",);
  const settings = await client.getSingle("settings");
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <NavBar settings={settings} />
    </header>
  )
}