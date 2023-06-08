import { catchAxios } from "@/axios";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Person.module.css";
import FieldInfo from "@/components/FieldInfo";

export default function Project() {
  const toastRef = useRef(null);
  const router = useRouter();
  const projectId = router.query.id;

  const [project, setProject] = useState(null);
  const [projectUsersRoles, setProjectUsersRoles] = useState(null);

  useEffect(() => {
    async function getProjectData() {
      const projectData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/project/${projectId}`,
        toastRef
      );

      setProject(projectData);

      const projectUsersRolesData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/project/${projectId}`,
        toastRef
      );

      setProjectUsersRoles(projectUsersRolesData);
    }

    if (projectId) {
      getProjectData();
    }
  }, [projectId]);

  return (
    <>
      {project && projectUsersRoles ? (
        <main>
          <header className={styles.personHeader}>
            <h2>{project.name}</h2>
          </header>

          <section className={styles.personSection}>
            <h4 className={styles.fieldCategory}>Project details</h4>
            <FieldInfo fieldName="Name" fieldValue={project.name} />

            {projectUsersRoles.length > 0 && (
              <>
                <h4 className={styles.fieldCategory}>Roles and people</h4>
                {projectUsersRoles.map((projectUserRole) => (
                  <FieldInfo
                    id={projectUserRole.User.id}
                    fieldName={projectUserRole.Role.name}
                    fieldValue={projectUserRole.User.fullName}
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
