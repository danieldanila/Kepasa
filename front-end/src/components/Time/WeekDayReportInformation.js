import { catchAxios } from "@/axios";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/WeekDayReportInformation.module.css";
import minutesToFormattedTime from "@/dateFunctions/minutesToFormattedTime";
import ClassicActionableButton from "./ClassicActionableButton";
import { Toast } from "primereact/toast";
import getPaidFromMinutes from "@/dateFunctions/getPaidFromMinutes";
import WarningDialog from "../Forms/FormsComponents/WarningDialog";
import ClassicButton from "./ClassicButton";
import successToast from "@/toasts/successToast";

export default function WeekDayReportInformation({
  activityReportData,
  openEditFormDialog,
  confirmDeleteSelectedDataEntity,
  isApprovePage,
  updateActivityReports,
}) {
  const toastRef = useRef(null);

  const [activityReport, setActivityReport] = useState(activityReportData);
  const [userRoleOnProject, setUserRoleOnProject] = useState("No role");
  const [roleProjectHourlyPay, setRoleProjectHourlyPay] = useState(0);

  const [approveActivityReportDialog, setApproveActivityReportDialog] =
    useState(false);
  const [rejectActivityReportDialog, setRejectActivityReportDialog] =
    useState(false);

  useEffect(() => {
    setActivityReport(activityReportData);
  }, [activityReportData]);

  useEffect(() => {
    async function getUseRoleOnProject() {
      const userRoleOnProject = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/usersProjectsRoles/user/${activityReport.idUser}/project/${activityReport.idProject}/role`,
        toastRef
      );

      if (userRoleOnProject) {
        setUserRoleOnProject(userRoleOnProject);
      }
    }

    getUseRoleOnProject();
  }, [activityReport]);

  useEffect(() => {
    async function getRoleProjectHourlyPay() {
      const roleProjectHourlyPayData = await catchAxios(
        "GET",
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rolesProjects/role/${userRoleOnProject.id}/project/${activityReport.idProject}/hourlyPay`,
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

  const approveActivityReport = async (activityReport) => {
    await catchAxios(
      "PUT",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport/${activityReport.id}`,
      toastRef,
      {
        isApproved: true,
      }
    );

    const updatedActivityReport = await catchAxios(
      "GET",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport/${activityReport.id}`,
      toastRef
    );

    if (typeof updateActivityReports === "function") {
      updateActivityReports("The activity report was successfully approved");
    }

    setActivityReport(updatedActivityReport);

    setApproveActivityReportDialog(false);
  };

  const rejectActivityReport = async (activityReport) => {
    const updatedActivityReport = await catchAxios(
      "PUT",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport/${activityReport.id}`,
      toastRef,
      {
        isSent: false,
        rejectJustification: activityReport.rejectJustification
          ? activityReport.rejectJustification
          : "  ",
      }
    );

    if (updatedActivityReport && updatedActivityReport.data) {
      if (typeof updateActivityReports === "function") {
        updateActivityReports("The activity report was successfully rejected");
      }

      setActivityReport(updatedActivityReport.data);
    }
    setRejectActivityReportDialog(false);
  };

  const hideApproveActivityReportDialog = () => {
    setApproveActivityReportDialog(false);
  };

  const hideRejectActivityReportDialog = () => {
    setRejectActivityReportDialog(false);
  };

  return (
    <div className={styles.containers}>
      <div className={styles.leftContainer}>
        {!activityReport.isSent && activityReport.rejectJustification && (
          <p className={styles.rejectJustificationText}>REJECTED</p>
        )}
        {isApprovePage && (
          <>
            <p>
              <strong>Period:</strong> {activityReport.Period.name}
            </p>

            <p>
              <strong>Date:</strong> {activityReport.date}
            </p>
          </>
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
          {!activityReport.isSent && activityReport.rejectJustification && (
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
          <section className={styles.buttons}>
            {isApprovePage ? (
              <>
                <ClassicButton
                  onClick={() => setApproveActivityReportDialog(true)}
                  text={"\u2713"}
                />
                <ClassicButton
                  onClick={() => setRejectActivityReportDialog(true)}
                  text={"X"}
                />
              </>
            ) : (
              <>
                <ClassicActionableButton
                  actionFunction={openEditFormDialog}
                  functionData={activityReportData}
                  disabledCondition={activityReport.isSent}
                  icon={"\u270E"}
                />
                <ClassicActionableButton
                  actionFunction={confirmDeleteSelectedDataEntity}
                  functionData={activityReportData}
                  disabledCondition={activityReport.isSent}
                  icon={"\uD83D\uDDD1"}
                />
              </>
            )}
          </section>
          <p>{minutesToFormattedTime(activityReport.investedTime)}</p>
          {isApprovePage && (
            <p className={styles.money}>
              $
              {getPaidFromMinutes(
                activityReport.investedTime,
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
        dialogFunctionData={activityReport}
      />
      <WarningDialog
        visible={rejectActivityReportDialog}
        onHide={hideRejectActivityReportDialog}
        warningMessage={`Are you sure you want to reject this activity report?`}
        exitDialog={hideRejectActivityReportDialog}
        dialogFunction={rejectActivityReport}
        dialogFunctionData={activityReport}
        setDialogFunctionData={setActivityReport}
      />
      <Toast ref={toastRef} />
    </div>
  );
}
