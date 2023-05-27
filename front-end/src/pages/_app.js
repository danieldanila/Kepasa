import "@/styles/globals.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const UsersContext = createContext(null);

export default function App({ Component, pageProps }) {
  global.router = useRouter();
  global.pageRoute = router.pathname;
  global.currentPage = pageRoute.slice(1, pageRoute.length).toLocaleLowerCase();

  const emptyPerson = {
    id: null,
    email: "",
    phone: "",
    socialMediaLink: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
    isActive: false,
    isAdministrator: false,
    idDepartment: null,
    idMentor: null,
  };

  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(emptyPerson);

  useEffect(() => {
    async function getUserData() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`);
      const usersData = await res.json();
      setUsers(usersData);
    }

    getUserData();
  }, []);

  return (
    <>
      <UsersContext.Provider
        value={{ users, setUsers, emptyPerson, user, setUser }}
      >
        <Navbar />
        <Sidebar />
        <Component {...pageProps} />
      </UsersContext.Provider>
    </>
  );
}
