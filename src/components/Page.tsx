import Head from "next/head";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

const Page = ({ children, title }: Props) => (
  <>
    <Head>
      <title>{title} | Tinnies</title>
    </Head>

    {children}
  </>
);

export default Page;
