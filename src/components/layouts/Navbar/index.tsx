import { signIn, signOut, useSession } from "next-auth/react";
import styles from "@/styles/components/Navbar.module.scss";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <header>
      <div className={[styles.container, styles.navbar].join(" ")}>
        <div className={styles.navbar__title}>
          <Link href={"/"}>TokoAx</Link>
        </div>
        <nav>
          <ul className={styles.navbar__listItem}>
            <li>
              <Link href={"#"}>Product</Link>
            </li>
            <li>
              <button
                className={styles.navbar__listItem__button}
                onClick={() => (data ? signOut() : signIn())}
              >
                {data ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
