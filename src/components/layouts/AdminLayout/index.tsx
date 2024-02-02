import Sidebar from "@/components/fragments/sidebar";
import styles from "./AdminLayout.module.scss";
import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const listSidebar = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: "fa-desktop",
  },
  {
    title: "Products",
    url: "/admin/product",
    icon: "fa-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "fa-users",
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: "fa-user",
  },
];

const AdminLayouts = ({ children }: AdminLayoutProps) => {
  return (
    <div className={styles.layout}>
      <Sidebar list={listSidebar} />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default AdminLayouts;
