import { catchAxios } from "@/axios";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/WeekDayReportInformation.module.css";
import minutesToFormattedTime from "@/dateFunctions/minutesToFormattedTime";
import ClassicActionableButton from "./ClassicActionableButton";
import { Toast } from "primereact/toast";
import getPaidFromMinutes from "@/dateFunctions/getPaidFromMinutes";
import WarningDialog from "../Forms/FormsComponents/WarningDialog";
import ClassicButton from "./ClassicButton";

export default function WeekDayReportInformation({
  activityReportData,
  openEditFormDialog,
  confirmDeleteSelectedDataEntity,
  isApprovePage,
}) {
  const toastRef = useRef(null);

  const [userRoleOnProject, setUserRoleOnProject] = useState("No role");
  const [roleProjectHourlyPay, setRoleProjectHourlyPay] = useState(0);

  const [approveActivityReportDialog, setApproveActivityReportDialog] =
    useState(false);

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

  useEffect(() => {
    async function getRoleProjectHourlyPay() {
      const roleProjectHourlyPayData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rolesProjects/role/${userRoleOnProject.id}/project/${activityReportData.idProject}/hourlyPay`,
        toastRef
      );

      if (roleProjectHourlyPayData) {
        setRoleProjectHourlyPay(roleProjectHourlyPayData);
      }
    }

    if (userRoleOnProject.id) {
      getRoleProjectHourlyPay();
    }
  }, [userRoleOnProject.id]);

  const approveActivityReport = async () => {
    await catchAxios(
      "PUT",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport/${activityReportData.id}`,
      toastRef,
      {
        isApproved: true,
      }
    );

    setApproveActivityReportDialog(false);
  };

  const hideApproveActivityReportDialog = () => {
    setApproveActivityReportDialog(false);
  };

  return (
    <div className={styles.containers}>
      <div className={styles.leftContainer}>
        {activityReportData.rejectJustification && (
          <p className={styles.rejectJustificationText}>REJECTED</p>
        )}
        {isApprovePage && (
          <>
            <p>
              <strong>Period:</strong> {activityReportData.Period.name}
            </p>

            <p>
              <strong>Date:</strong> {activityReportData.date}
            </p>
          </>
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
            {isApprovePage ? (
              <>
                <ClassicButton
                  onClick={() => setApproveActivityReportDialog(true)}
                  text={"\u2713"}
                />
                <ClassicButton text={"X"} />
              </>
            ) : (
              <>
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
              </>
            )}
          </section>
          <p>{minutesToFormattedTime(activityReportData.investedTime)}</p>
          {isApprovePage && (
            <p className={styles.money}>
              $
              {getPaidFromMinutes(
                activityReportData.investedTime,
                roleProjectHourlyPay
              )}
            </p>
          )}
        </section>
      </div>
      <WarningDialog
        visible={approveActivityReportDialog}
        onHide={hideApproveActivityReportDialog}
        warningMessage={`Are you sure you want to approve this activity report?`}
        exitDialog={hideApproveActivityReportDialog}
        dialogFunction={approveActivityReport}
        dialogFunctionData={activityReportData}
      />
      <Toast ref={toastRef} />
    </div>
  );
}
