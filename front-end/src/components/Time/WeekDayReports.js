import WeekDayReportInformation from "./WeekDayReportInformation";
import styles from "../../styles/WeekDayReports.module.css";

export default function WeekDayReports({ activityReports }) {
  return (
    <div className={styles.container}>
      {activityReports.map((activityReport) => (
        <WeekDayReportInformation
          key={activityReport.id}
          activityReport={activityReport}
        />
      ))}
    </div>
  );
}
