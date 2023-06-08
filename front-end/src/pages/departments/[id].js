import { catchAxios } from "@/axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Person.module.css";
import FieldInfo from "@/components/FieldInfo";

export default function Department() {
  const toastRef = useRef(null);
  const router = useRouter();
  const departmentId = router.query.id;

  const [department, setDepartment] = useState(null);
  const [departmentUsersRoles, setDepartmentUsersRoles] = useState(null);

  useEffect(() => {
    async function getDepartmentData() {
      const departmentData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department/${departmentId}`,
        toastRef
      );

      setDepartment(departmentData);

      const departmentUsersRolesData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/department/${departmentId}/usersRoles`,
        toastRef
      );

      setDepartmentUsersRoles(departmentUsersRolesData);
    }

    if (departmentId) {
      getDepartmentData();
    }
  }, [departmentId]);

  return (
    <>
      {department && departmentUsersRoles ? (
        <main>
          <header className={styles.personHeader}>
            <h2>{department.name}</h2>
          </header>

          <section className={styles.personSection}>
            <h4 className={styles.fieldCategory}>Department details</h4>
            <FieldInfo fieldName="Name" fieldValue={department.name} />

            {departmentUsersRoles.Roles.length > 0 && (
              <>
                <h4 className={styles.fieldCategory}>Roles and people</h4>
                {departmentUsersRoles.Roles.map((departmentUserRole) =>
                  departmentUserRole.UsersProjectsRoles.map(
                    (userProjectRole) => (
                      <FieldInfo
                        id={userProjectRole.User.id}
                        fieldName={departmentUserRole.name}
                        fieldValue={userProjectRole.User.fullName}
                        pageName="people"
                      />
                    )
                  )
                )}
              </>
            )}
          </section>
        </main>
      ) : (
        <Loading />
      )}
      <Toast ref={toastRef} />
    </>
  );
}
