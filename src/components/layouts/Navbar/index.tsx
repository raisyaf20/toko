import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div>
      <button onClick={() => (data ? signOut() : signIn())}>
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
