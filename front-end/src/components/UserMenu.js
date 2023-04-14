import React, { useRef } from "react";
import { Menu } from "primereact/menu";

export default function UserMenu() {
  const userMenuList = [
    {
      label: "User Menu",
      items: [
        {
          label: "Go to my profile",
        },
        {
          label: "Log out",
        },
      ],
    },
  ];

  const menuRef = useRef(null);

  return (
    <>
      <span onClick={(e) => menuRef.current.toggle(e)}>
        <i className="navBarIcon pi pi-user" />
      </span>
      <Menu model={userMenuList} popup ref={menuRef} />
    </>
  );
}
