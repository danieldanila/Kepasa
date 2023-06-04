import React, { useRef } from "react";
import { Menu } from "primereact/menu";
import { catchAxios } from "@/axios";

export default function UserMenu() {
  const logout = async () => {
    const response = await catchAxios(
      "GET",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/authentication/logout`
    );

    if (response.status === "success") {
      location.reload(true);
    }
  };
  const userMenuList = [
    {
      label: "User Menu",
      items: [
        {
          label: "Go to my profile",
        },
        {
          label: "Log out",
          command: () => {
            logout();
          },
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
