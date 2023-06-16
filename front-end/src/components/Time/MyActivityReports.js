import WeekDay from "./WeekDay";
import styles from "../../styles/MyActivityReports.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { ActivityReportsContext, LoggedUserContext } from "@/pages/_app";
import getWeekNumber from "@/dateFunctions/getWeekNumber";
import generateWeekDaysData from "@/dateFunctions/generateWeekDaysData";
import formatDateToString from "@/dateFunctions/formatDateToString";
import WeeksHeader from "./WeeksHeader";
import WeekDayReports from "./WeekDayReports";
import FormDialog from "../Forms/FormsComponents/FormDialog";
import ActivityReportForm from "../Forms/ActivityReportForm";
import { Toast } from "primereact/toast";
import { catchAxios } from "@/axios";
import DeleteEntityDialog from "../Forms/FormsComponents/DeleteEntityDialog";

export default function MyActivityReports() {
  const { loggedUser } = useContext(LoggedUserContext);
  const {
    activityReports,
    setActivityReports,
    emptyActivityReport,
    activityReport,
    setActivityReport,
  } = useContext(ActivityReportsContext);

  const [showFormDialog, setShowFormDialog] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteSelectedDataEntityDialog, setDeleteSelectedDataEntityDialog] =
    useState(false);
  const [selectedDataEntity, setSelectedDataEntity] = useState(null);

  const [selectedWeekNumber, setSelectedWeekNumber] = useState(0);

  const [selectedYear, setSelectedYear] = useState(new Date().getUTCFullYear());

  const [weekDaysData, setWeekDaysData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [datePeriod, setDatePeriod] = useState(null);

  const toastRef = useRef(null);

  useEffect(() => {
    async function getDatePeriod() {
      const datePeriodData = await catchAxios(
        "GET",
        `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/api/period/date/${formatDateToString(selectedDate)}`,
        toastRef
      );

      setDatePeriod(datePeriodData);
    }

    if (selectedDate) {
      getDatePeriod();
    }
  }, [selectedDate]);

  const openFormDialog = () => {
    let activityReportCopy = { ...activityReport };
    activityReportCopy.date = formatDateToString(selectedDate);
    activityReportCopy.idUser = loggedUser.id;
    activityReportCopy.idPeriod = datePeriod.id;

    setActivityReport(activityReportCopy);
    setIsUpdate(false);
    setShowFormDialog(true);
  };

  const openEditFormDialog = (activityReport) => {
    setActivityReport(activityReport);
    setSelectedDataEntity(activityReport);
    setIsUpdate(true);
    setShowFormDialog(true);
  };

  const confirmDeleteSelectedDataEntity = (rowData) => {
    setSelectedDataEntity(rowData);
    setDeleteSelectedDataEntityDialog(true);
  };

  useEffect(() => {
    const weekDaysData = generateWeekDaysData(
      activityReports,
      selectedWeekNumber,
      selectedYear,
      loggedUser
    );

    setWeekDaysData(weekDaysData);
  }, [activityReports, selectedWeekNumber, selectedYear]);

  const [totalInvestedTime, setTotalInvestedTime] = useState(0);

  useEffect(() => {
    setTotalInvestedTime(
      weekDaysData.reduce((sum, day) => sum + day.investedTime, 0)
    );
  }, [weekDaysData]);

  useEffect(() => {
    setSelectedWeekNumber(getWeekNumber(selectedDate));
  }, [selectedDate]);

  useEffect(() => {
    setSelectedYear(selectedDate.getUTCFullYear());
  }, [selectedDate.getUTCFullYear()]);

  const handleDayClick = (dateString) => {
    setSelectedDate(new Date(dateString));
  };

  const sendReports = async () => {
    const updatedActivityReports = await Promise.all(
      activityReports.map(async (activityReport) => {
        const matchingDay = weekDaysData.find(
          (day) => day.date === activityReport.date
        );
        if (matchingDay && matchingDay.activityReports) {
          const reportInWeek = matchingDay.activityReports.find(
            (weekReport) => weekReport.id === activityReport.id
          );
          if (reportInWeek) {
            if (!activityReport.isSent) {
              const updatedReport = {
                ...activityReport,
                isSent: true,
                rejectJustification: null,
              };

              const { id, ...updatedReportData } = updatedReport;
              await await catchAxios(
                "PUT",
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/activityReport/${activityReport.id}`,
                toastRef,
                updatedReportData
              );
              return updatedReport;
            }
          }
        }
        return activityReport;
      })
    );
    setActivityReports(updatedActivityReports);
  };

  return (
    <>
      <WeeksHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        openFormDialog={openFormDialog}
        sendReports={sendReports}
      />
      <div className={styles.container}>
        {weekDaysData.map((day) => (
          <WeekDay
            dateString={day.date}
            key={day.date}
            dayName={day.name}
            minutesLogged={day.investedTime}
            isSelected={formatDateToString(selectedDate) === day.date}
            onClick={handleDayClick}
          />
        ))}
        <WeekDay
          dayName="Total"
          minutesLogged={totalInvestedTime}
          onClick={() => {}}
        />
      </div>
      <div>
        {weekDaysData
          .filter((day) => formatDateToString(selectedDate) === day.date)
          .map((day) => (
            <WeekDayReports
              key={day.date}
              activityReports={day.activityReports}
              openEditFormDialog={openEditFormDialog}
              confirmDeleteSelectedDataEntity={confirmDeleteSelectedDataEntity}
            />
          ))}
      </div>
      <FormDialog
        DataForm={ActivityReportForm}
        dataEntity={activityReport}
        setDataEntity={setActivityReport}
        emptyDataEntity={emptyActivityReport}
        selectedDataEntity={selectedDataEntity}
        setSelectedDataEntity={setSelectedDataEntity}
        openFormDialog={openFormDialog}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        showFormDialog={showFormDialog}
        setShowformDialog={setShowFormDialog}
        data={activityReports}
        setData={setActivityReports}
        dataName={"activityReport"}
      />

      <DeleteEntityDialog
        selectedDataEntity={selectedDataEntity}
        setSelectedDataEntity={setSelectedDataEntity}
        emptyDataEntity={emptyActivityReport}
        setData={setActivityReports}
        deleteSelectedDataEntityDialog={deleteSelectedDataEntityDialog}
        setDeleteSelectedDataEntityDialog={setDeleteSelectedDataEntityDialog}
        data={activityReports}
        dataName={"activityReport"}
      />
      <Toast ref={toastRef} />
    </>
  );
}
