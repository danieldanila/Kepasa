import { useContext, useEffect, useRef, useState } from "react";
import WeekDayReports from "./WeekDayReports";
import { catchAxios } from "@/axios";
import { Toast } from "primereact/toast";
import { LoggedUserContext } from "@/pages/_app";
import successToast from "@/toasts/successToast";

export default function ActivityReportsToApprove({}) {
  const { loggedUser } = useContext(LoggedUserContext);

  const toastRef = useRef(null);
  const [activityReportsToApprove, setActivityReportsToApprove] = useState([]);

  useEffect(() => {
    async function getActivityReportsToApprove() {
      const activityReportsToApproveData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${loggedUser.id}/subUsersActivityReports`,
        toastRef
      );

      setActivityReportsToApprove(activityReportsToApproveData);
    }

    getActivityReportsToApprove();
  }, []);

  const updateActivityReportsToApprove = async (message) => {
    const activityReportsToApproveData = await catchAxios(
      "GET",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${loggedUser.id}/subUsersActivityReports`,
      toastRef
    );

    setActivityReportsToApprove(activityReportsToApproveData);
    successToast(toastRef, message);
  };

  return (
    <>
      {activityReportsToApprove.length > 0 ? (
        <WeekDayReports
          activityReports={activityReportsToApprove}
          isApprovePage={true}
          updateActivityReports={updateActivityReportsToApprove}
        />
      ) : (
        <p>You have no activity reports to approve.</p>
      )}
      <Toast ref={toastRef} />
    </>
  );
}
