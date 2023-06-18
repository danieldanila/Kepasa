import { catchAxios } from "@/axios";

async function getRoleProjectHourlyPay(idRole, idProject, toastRef) {
  const roleProjectHourlyPayData = await catchAxios(
    "GET",
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rolesProjects/role/${idRole}/project/${idProject}/hourlyPay`,
    toastRef
  );
  return roleProjectHourlyPayData;
}

export default getRoleProjectHourlyPay;
