import { catchAxios } from "@/axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Person.module.css";
import FieldInfoSection from "@/components/FieldInfoSection";

export default function Person() {
  const toastRef = useRef(null);
  const router = useRouter();
  const userId = router.query.id;

  const [user, setUser] = useState(null);
  const [userRoleOnDepartment, setUserRoleOnDepartment] = useState(null);
  const [userDepartmentSuperior, setUerDepartmentSuperior] = useState(null);

  useEffect(() => {
    async function getUserData() {
      const user = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${userId}`,
        toastRef
      );

      setUser(user);

      const userRoleOnDepartment = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${userId}/department/role`,
        toastRef
      );

      setUserRoleOnDepartment(userRoleOnDepartment);

      if (userRoleOnDepartment && userRoleOnDepartment.idSuperiorRole) {
        const userDepartmentSuperior = await catchAxios(
          "GET",
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/role/${userRoleOnDepartment.idSuperiorRole}`,
          toastRef
        );

        if (userDepartmentSuperior && userDepartmentSuperior[0].User) {
          setUerDepartmentSuperior(userDepartmentSuperior[0].User);
        } else {
          setUerDepartmentSuperior({ fullName: "No superior" });
        }
      } else {
        setUerDepartmentSuperior({ fullName: "No superior" });
        if (!userRoleOnDepartment) {
          setUserRoleOnDepartment({ name: "No role" });
        }
      }
    }

    if (userId) {
      getUserData();
    }
  }, [userId]);

  return (
    <>
      {user && userRoleOnDepartment && userDepartmentSuperior ? (
        <main>
          {console.log(userDepartmentSuperior)}
          <header className={styles.personHeader}>
            <h2>{user.fullName}</h2>
            <p>{userRoleOnDepartment.name}</p>
          </header>
          <section className={styles.personSection}>
            <FieldInfoSection
              firstFieldName="First Name"
              firstFieldValue={user.firstName}
              secondFieldName="Last Name"
              secondFieldValue={user.lastName}
            />
            <FieldInfoSection
              firstFieldName="Email"
              firstFieldValue={user.email}
              secondFieldName="Phone"
              secondFieldValue={user.phone}
            />
            <FieldInfoSection
              firstFieldName="Birthday"
              firstFieldValue={user.birthday}
              secondFieldName="Social Media Link"
              secondFieldValue={user.socialMediaLink}
            />
            <FieldInfoSection
              firstFieldName="Department"
              firstFieldValue={user.Department.name}
              secondFieldName="Role"
              secondFieldValue={userRoleOnDepartment.name}
            />
            <FieldInfoSection
              firstFieldName="First Manager"
              firstFieldValue={userDepartmentSuperior.fullName}
              firstId={userDepartmentSuperior.id}
              secondFieldName="Mentor"
              secondFieldValue={
                user.mentor ? user.mentor.fullName : "No mentor"
              }
              secondId={user.mentor && user.mentor.id}
            />
          </section>
        </main>
      ) : (
        <Loading />
      )}
      <Toast ref={toastRef} />
    </>
  );
}
