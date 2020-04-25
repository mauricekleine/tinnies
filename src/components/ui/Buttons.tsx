import Link, { LinkProps } from "next/link";
import React from "react";

interface ButtonProps {
  onClick: React.MouseEventHandler,
  text: string;
}

export const Button = ({ text, onClick }: ButtonProps) => (
  <button
    className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
    onClick={onClick}
  >
    {text}
  </button>
);

interface ButtonLinkProps {
  text: ButtonProps["text"];
  to: LinkProps["href"];
}

export const ButtonLink = ({ text, to }: ButtonLinkProps) => (
  <Link href={to}>
    <a className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">
      {text}
    </a>
  </Link>
);
