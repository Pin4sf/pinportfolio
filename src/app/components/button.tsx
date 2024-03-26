import { PrismicNextLink } from "@prismicio/next";
import React from "react";
import { MdArrowOutward } from "react-icons/md";
import clsx from "clsx";
import { KeyTextField, LinkField } from "@prismicio/client";

type ButtonProps = {
  linkField: LinkField;
  label: KeyTextField;
  showIcon?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export default function Button({
  linkField,
  label,
  showIcon = true,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <PrismicNextLink
      field={linkField}
      className={clsx(
        "group relative flex w-fit items-center justify-center overflow-hidden rounded-md border-2 border-slate-900 bg-slate-300 px-4 py-2 font-bold transition-transform ease-out text-black hover:scale-105",
        className,
      )}
    >
      <span
        className={clsx(
          "absolute inset-0 z-0 h-full translate-y-9 bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
        )}
      />
      <span className="relative flex items-center justify-center gap-2">
        {label} {showIcon && <MdArrowOutward className="inline-block" />}
        {children}
      </span>
    </PrismicNextLink>
  );
}