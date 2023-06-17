import WeekDayReportInformation from "./WeekDayReportInformation";
import styles from "../../styles/WeekDayReports.module.css";

export default function WeekDayReports({
  activityReports,
  openEditFormDialog,
  confirmDeleteSelectedDataEntity,
  isApprovePage,
}) {
  return (
    <div className={styles.container}>
      {activityReports.map((activityReport) => (
        <WeekDayReportInformation
          key={activityReport.id}
          activityReportData={activityReport}
          openEditFormDialog={openEditFormDialog}
          confirmDeleteSelectedDataEntity={confirmDeleteSelectedDataEntity}
          isApprovePage={isApprovePage}
        />
      ))}
    </div>
  );
}
