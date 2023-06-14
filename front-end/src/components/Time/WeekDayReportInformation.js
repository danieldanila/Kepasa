import { catchAxios } from "@/axios";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/WeekDayReportInformation.module.css";
import minutesToFormattedTime from "@/dateFunctions/minutesToFormattedTime";
import { Toast } from "primereact/toast";

export default function WeekDayReportInformation({ activityReport }) {
  const [userRoleOnProject, setUserRoleOnProject] = useState("No role");
  const toastRef = useRef(null);

  useEffect(() => {
    async function getUseRoleOnProject() {
      const userRoleOnProject = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${activityReport.idUser}/project/${activityReport.idProject}/role`,
        toastRef
      );

      setUserRoleOnProject(userRoleOnProject);
    }

    getUseRoleOnProject();
  }, [activityReport]);

  return (
    <div className={styles.containers}>
      <div className={styles.leftContainer}>
        {activityReport.rejectJustification && (
          <p className={styles.rejectJustificationText}>REJECTED</p>
        )}
        <section className={styles.activityMetadataContainer}>
          <p>
            <strong>Task Type: </strong>
            {activityReport.TaskType.name}
          </p>
          <p>-</p>
          <p>{activityReport.User.fullName}</p>
          <p>
            {activityReport.isApproved
              ? activityReport.isSent && "\u2713"
              : activityReport.isSent && "\u23F3"}
          </p>
        </section>
        <section className={styles.activityProjectDataContainer}>
          <p>
            <strong>Project: </strong>
            {activityReport.Project.name}
          </p>
          <p>
            <strong>Role: </strong>
            {userRoleOnProject.name}
          </p>
        </section>
        <section className={styles.activityDescriptionContainer}>
          <p>{activityReport.description}</p>
          {activityReport.rejectJustification && (
            <p>
              <span className={styles.rejectJustificationText}>
                Reject justification:{" "}
              </span>
              {activityReport.rejectJustification}
            </p>
          )}
        </section>
      </div>
      <div className={styles.rightContainer}>
        <section className={styles.actionContainer}>
          <button
            disabled={activityReport.isSent}
            className={`${styles.editButton} ${
              activityReport.isSent && styles.editButtonDisabled
            }`}
          >
            {"\u270E"}
          </button>
          <p>{minutesToFormattedTime(activityReport.investedTime)}</p>
        </section>
      </div>
      <Toast ref={toastRef} />
    </div>
  );
}
