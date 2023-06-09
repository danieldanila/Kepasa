import { catchAxios } from "@/axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Person.module.css";
import FieldInfo from "@/components/FieldInfo";
import FieldInfoSection from "@/components/FieldInfoSection";

export default function Roles() {
  const toastRef = useRef(null);
  const router = useRouter();
  const roleId = router.query.id;

  const [role, setRole] = useState(null);
  const [roleProjectsRoles, setRoleProjectsRoles] = useState(null);

  useEffect(() => {
    async function getRoleData() {
      const roleData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/role/${roleId}`,
        toastRef
      );

      setRole(roleData);

      const roleProjectsRolesData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/role/${roleId}`,
        toastRef
      );

      setRoleProjectsRoles(roleProjectsRolesData);
    }

    if (roleId) {
      getRoleData();
    }
  }, [roleId]);

  return (
    <>
      {role && roleProjectsRoles ? (
        <main>
          <header className={styles.personHeader}>
            <h2>{role.name}</h2>
          </header>

          <section className={styles.personSection}>
            <h4 className={styles.fieldCategory}>Role details</h4>
            <FieldInfo fieldName="Name" fieldValue={role.name} />
            <FieldInfoSection
              firstFieldName="Department"
              firstFieldValue={role.Department.name}
              firstId={role.Department.id}
              secondFieldName="Superior Role"
              secondFieldValue={
                role.superiorRole ? role.superiorRole.name : "No superior role"
              }
              secondId={role.superiorRole && role.superiorRole.id}
              firstPageName="departments"
              secondPageName="roles"
            />

            {roleProjectsRoles.length > 0 && (
              <>
                <h4 className={styles.fieldCategory}>Projects and people</h4>
                {roleProjectsRoles.map((roleProjectRole) => (
                  <FieldInfo
                    id={roleProjectRole.User.id}
                    key={
                      roleProjectRole.User.id + ":" + roleProjectRole.Project.id
                    }
                    fieldName={roleProjectRole.Project.name}
                    fieldValue={roleProjectRole.User.fullName}
                    pageName="people"
                  />
                ))}
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
