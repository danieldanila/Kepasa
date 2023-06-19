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
import styles from "../../styles/ActivityReportCostsLine.module.css";
import getSortedAndFilteredReports from "@/activityReportsFunctions/getSortedAndFilteredReports";
import sortedAndFilteredReportsToCsv from "@/activityReportsFunctions/sortedAndFilteredReportsToCsv";
import Loading from "../Loading";

import readCSVFile from "@/activityReportsFunctions/readCSVFile";
import ClassicButton from "../Time/ClassicButton";

export default function ActivityReportCostsLine({}) {
  const toastRef = useRef(null);
  const { activityReports } = useContext(ActivityReportsContext);
  const [sortedAndFilteredReports, setSortedAndFilteredReports] = useState([]);
  const [predictionData, setPredictionData] = useState([]);

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
  }, [activityReports]);

  const dailyWorkedTimeData = {
    labels: sortedAndFilteredReports.map(
      (activityReport) => activityReport.date
    ),
    datasets: [
      {
        label: "Approved Activity Reports",
        data: sortedAndFilteredReports.map((activityReport) =>
          activityReport.approvedInvestedTime > 0
            ? activityReport.approvedInvestedTime
            : null
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
        data: sortedAndFilteredReports.map((activityReport) =>
          activityReport.approvedPay > 0 ? activityReport.approvedPay : null
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
      {
        label: "ARMA prediction",
        data: predictionData.map((prediction) =>
          prediction.ARMA_Predictions !== ""
            ? prediction.ARMA_Predictions
            : null
        ),
        borderColor: "rgb(78, 72, 124)",
      },
      {
        label: "ARIMA prediction",
        data: predictionData.map((prediction) =>
          prediction.ARIMA_Predictions !== ""
            ? prediction.ARIMA_Predictions
            : null
        ),
        borderColor: "rgb(195, 110, 18)",
      },
      {
        label: "SARIMA prediction",
        data: predictionData.map((prediction) =>
          prediction.SARIMA_Predictions !== ""
            ? prediction.SARIMA_Predictions
            : null
        ),
        borderColor: "rgb(249, 129, 37)",
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

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      const csvData = await readCSVFile(file);
      setPredictionData(csvData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadCSV = () => {
    sortedAndFilteredReportsToCsv(sortedAndFilteredReports);
  };

  return (
    <>
      {sortedAndFilteredReports.length > 0 ? (
        <>
          <div className={styles.buttonContainer}>
            <ClassicButton
              text={"Download CSV data"}
              onClick={handleDownloadCSV}
            />
            <ClassicButton
              text={"Upload CSV"}
              hasInput={true}
              onChange={handleFileUpload}
            />
          </div>
          <div className={styles.container}>
            <div>
              <Line
                options={dailyWorkedTimeOptions}
                data={dailyWorkedTimeData}
              />
            </div>
            <div>
              <Line options={dailyCostsOptions} data={dailyCostsData} />
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      <Toast ref={toastRef} />
    </>
  );
}
