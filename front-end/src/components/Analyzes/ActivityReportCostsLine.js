import { ActivityReportsContext } from "@/pages/_app";
import { useContext, useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
} from "chart.js";
import { Toast } from "primereact/toast";
import getUseRoleOnProject from "@/api/getUserRoleOnProject";
import getRoleProjectHourlyPay from "@/api/getRoleProjectHourlyPay";
import styles from "../../styles/ActivityReportCostsLine.module.css";
import getSortedAndFilteredReports from "@/activityReportsFunctions/getSortedAndFilteredReports";
import sortedAndFilteredReportsToCsv from "@/activityReportsFunctions/sortedAndFilteredReportsToCsv";

export default function ActivityReportCostsLine({}) {
  const toastRef = useRef(null);
  const { activityReports } = useContext(ActivityReportsContext);
  const [sortedAndFilteredReports, setSortedAndFilteredReports] = useState([]);

  ChartJS.register(
    LineController,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    CategoryScale,
    Legend
  );

  useEffect(() => {
    async function getChartData() {
      const sortedAndFilteredReports = await getSortedAndFilteredReports(
        activityReports,
        toastRef
      );

      setSortedAndFilteredReports(sortedAndFilteredReports);
    }

    getChartData();

    // const csv = sortedAndFilteredReportsToCsv(sortedAndFilteredReports);
  }, [activityReports]);

  const dailyWorkedTimeData = {
    labels: sortedAndFilteredReports.map(
      (activityReport) => activityReport.date
    ),
    datasets: [
      {
        label: "Approved Activity Reports",
        data: sortedAndFilteredReports.map(
          (activityReport) => activityReport.approvedInvestedTime
        ),
        borderColor: "rgb(46, 108, 181)",
      },
      {
        label: "All Activity Reports",
        data: sortedAndFilteredReports.map(
          (activityReport) => activityReport.investedTime
        ),
        borderColor: "rgb(29, 23, 75)",
      },
    ],
  };

  const dailyCostsData = {
    labels: sortedAndFilteredReports.map(
      (activityReport) => activityReport.date
    ),
    datasets: [
      {
        label: "Approved Activity Reports",
        data: sortedAndFilteredReports.map(
          (activityReport) => activityReport.approvedPay
        ),
        borderColor: "rgb(46, 108, 181)",
      },
      {
        label: "All Activity Reports",
        data: sortedAndFilteredReports.map(
          (activityReport) => activityReport.pay
        ),
        borderColor: "rgb(29, 23, 75)",
      },
    ],
  };

  const dailyWorkedTimeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily time worked in minutes",
      },
    },
  };

  const dailyCostsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Daily costs in $",
      },
    },
  };

  return (
    <div className={styles.container}>
      <div>
        <Line options={dailyWorkedTimeOptions} data={dailyWorkedTimeData} />
      </div>
      <div>
        <Line options={dailyCostsOptions} data={dailyCostsData} />
      </div>

      <Toast ref={toastRef} />
    </div>
  );
}
