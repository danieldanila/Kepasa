import { catchAxios } from "@/axios";

async function getUseRoleOnProject(idUser, idProject, toastRef) {
  const userRoleOnProject = await catchAxios(
    "GET",
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${idUser}/project/${idProject}/role`,
    toastRef
  );

  return userRoleOnProject;
}

export default getUseRoleOnProject;
