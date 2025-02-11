import Link from "next/link";
import React from "react";

type Props = {};

const Unauthorized = (props: Props) => {
  return (
    <div className="p-4 text-center flex flex-col items-center justify-center">
      Unauthorized
      <h1 className="text-3xl md:text-6xl">Unauthorized Access</h1>
      <p>Please contact support or your agency owner to get access</p>
      <Link href={"/"} className="mt-4 bg-blue-500 p-2">
        Back to home
      </Link>
    </div>
  );
};

export default Unauthorized;
