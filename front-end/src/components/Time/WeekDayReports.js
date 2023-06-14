import WeekDayReportInformation from "./WeekDayReportInformation";
import styles from "../../styles/WeekDayReports.module.css";
import { useContext } from "react";
import { LoggedUserContext } from "@/pages/_app";

export default function WeekDayReports({ activityReports }) {
  const { loggedUser } = useContext(LoggedUserContext);
  return (
    <div className={styles.container}>
      {activityReports
        .filter((activityReport) => activityReport.idUser === loggedUser.id)
        .map((activityReport) => (
          <WeekDayReportInformation
            key={activityReport.id}
            activityReport={activityReport}
          />
        ))}
    </div>
  );
}
