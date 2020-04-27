import React from "react";

type Props = {
  children: React.ReactNode;
};

const Card = ({ children }: Props) => (
  <section className="bg-white border border-b-4 border-gray-300 mb-8 p-4 rounded">
    {children}
  </section>
);

export default Card;
