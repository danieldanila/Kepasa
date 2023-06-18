import getRoleProjectHourlyPay from "@/api/getRoleProjectHourlyPay";
import getUseRoleOnProject from "@/api/getUserRoleOnProject";

const getSortedAndFilteredReports = async (activityReports, toastRef) => {
  const sortedReports = activityReports.sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  const summedReports = await sortedReports.reduce(
    async (accumulatorPromise, currentReport) => {
      const accumulator = await accumulatorPromise;
      const existingReport = accumulator.find(
        (report) => report.date === currentReport.date
      );

      const userRoleOnProject = await getUseRoleOnProject(
        currentReport.idUser,
        currentReport.idProject,
        toastRef
      );

      const roleProjectHourlyPay = parseFloat(
        await getRoleProjectHourlyPay(
          userRoleOnProject.id,
          currentReport.idProject,
          toastRef
        )
      );

      if (existingReport) {
        existingReport.investedTime += currentReport.investedTime;
        existingReport.approvedInvestedTime += currentReport.isApproved
          ? currentReport.investedTime
          : 0;
        existingReport.pay += roleProjectHourlyPay;
        existingReport.approvedPay += currentReport.isApproved
          ? roleProjectHourlyPay
          : 0;
      } else {
        const report = {
          date: currentReport.date,
          investedTime: currentReport.investedTime,
          approvedInvestedTime: currentReport.isApproved
            ? currentReport.investedTime
            : 0,
          pay: roleProjectHourlyPay,
          approvedPay: currentReport.isApproved ? roleProjectHourlyPay : 0,
        };
        accumulator.push(report);
      }

      return accumulator;
    },
    []
  );

  return summedReports;
};

export default getSortedAndFilteredReports;
