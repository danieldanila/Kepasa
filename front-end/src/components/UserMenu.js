import React, { useContext, useRef } from "react";
import { Menu } from "primereact/menu";
import { catchAxios } from "@/axios";
import { LoggedUserContext } from "@/pages/_app";

export default function UserMenu() {
  const { loggedUser } = useContext(LoggedUserContext);

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
          command: () => {
            global.router.push("/people/" + loggedUser.id);
          },
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
