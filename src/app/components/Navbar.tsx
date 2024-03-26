"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import Button from "./button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavBar({
  settings,
}: {
  settings: Content.SettingsDocument;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
        <div className="flex items-center justify-between">
          <NameLogo name={settings.data.name} />
          <Button
            linkField={settings.data.cta_link}
            label={settings.data.cta_label}
            className="block p-2 text-2xl text-slate-800 md:hidden"
          />
        </div>
        <div
          className={clsx(
            "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          {links.map((link, index) => (
            <li key={index}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
          <li>
            <Button
              linkField={settings.data.cta_link}
              label={settings.data.cta_label}
              className="ml-3"
            />
          </li>
        </div>
        <DesktopMenu settings={settings} pathname={pathname} />
      </ul>
    </nav>
  );
}

function NameLogo({ name }: { name: KeyTextField }) {
  return (
    <Link
      href="/"
      aria-label="Home page"
      className="text-xl font-extrabold tracking-tighter text-slate-900"
    >
      {name}
    </Link>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: Content.SettingsDocument;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      <li>
        <Button
          linkField={settings.data.cta_link}
          label={settings.data.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}