import { catchAxios } from "@/axios";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/WeekDayReportInformation.module.css";
import minutesToFormattedTime from "@/dateFunctions/minutesToFormattedTime";
import ClassicActionableButton from "./ClassicActionableButton";
import { Toast } from "primereact/toast";

export default function WeekDayReportInformation({
  activityReportData,
  openEditFormDialog,
  confirmDeleteSelectedDataEntity,
}) {
  const toastRef = useRef(null);

  const [userRoleOnProject, setUserRoleOnProject] = useState("No role");

  useEffect(() => {
    async function getUseRoleOnProject() {
      const userRoleOnProject = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${activityReportData.idUser}/project/${activityReportData.idProject}/role`,
        toastRef
      );

      if (userRoleOnProject) {
        setUserRoleOnProject(userRoleOnProject);
      }
    }

    getUseRoleOnProject();
  }, [activityReportData]);

  return (
    <div className={styles.containers}>
      <div className={styles.leftContainer}>
        {activityReportData.rejectJustification && (
          <p className={styles.rejectJustificationText}>REJECTED</p>
        )}
        <section className={styles.activityMetadataContainer}>
          <p>
            <strong>Task Type: </strong>
            {activityReportData.TaskType.name}
          </p>
          <p>-</p>
          <p>{activityReportData.User.fullName}</p>
          <p>
            {activityReportData.isApproved
              ? activityReportData.isSent && "\u2713"
              : activityReportData.isSent && "\u23F3"}
          </p>
        </section>
        <section className={styles.activityProjectDataContainer}>
          <p>
            <strong>Project: </strong>
            {activityReportData.Project.name}
          </p>
          <p>
            <strong>Role: </strong>
            {userRoleOnProject.name}
          </p>
        </section>
        <section className={styles.activityDescriptionContainer}>
          <p>{activityReportData.description}</p>
          {activityReportData.rejectJustification && (
            <p>
              <span className={styles.rejectJustificationText}>
                Reject justification:{" "}
              </span>
              {activityReportData.rejectJustification}
            </p>
          )}
        </section>
      </div>
      <div className={styles.rightContainer}>
        <section className={styles.actionContainer}>
          <section className={styles.buttons}>
            <ClassicActionableButton
              actionFunction={openEditFormDialog}
              functionData={activityReportData}
              disabledCondition={activityReportData.isSent}
              icon={"\u270E"}
            />
            <ClassicActionableButton
              actionFunction={confirmDeleteSelectedDataEntity}
              functionData={activityReportData}
              disabledCondition={activityReportData.isSent}
              icon={"\uD83D\uDDD1"}
            />
          </section>
          <p>{minutesToFormattedTime(activityReportData.investedTime)}</p>
        </section>
      </div>
      <Toast ref={toastRef} />
    </div>
  );
}
