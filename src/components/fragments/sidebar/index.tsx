import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";

type SidebarCompProps = {
  list: {
    title: string;
    url: string;
    icon: string;
  }[];
};

const Sidebar = ({ list }: SidebarCompProps) => {
  const { pathname } = useRouter();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebar__title}>
        <h1>Admin Dash</h1>
      </div>
      <div className={styles.sidebar__parent}>
        <ul className={styles.sidebar__parent__list}>
          {list.map((e, i) => (
            <li
              key={i}
              className={`${
                pathname === e.url && styles.sidebar__parent__list__active
              }`}
            >
              <Link href={e.url}>
                <i className={`fa-solid ${e.icon}`}></i>
                {e.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <hr />
      <div className={styles.sidebar__parent}>
        <ul className={styles.sidebar__parent__list}>
          <li
            onClick={() => signOut()}
            className={styles.sidebar__parent__list__bottom}
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
