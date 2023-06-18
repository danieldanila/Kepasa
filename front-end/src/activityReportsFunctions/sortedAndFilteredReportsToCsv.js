const sortedAndFilteredReportsToCsv = (sortedAndFilteredReports) => {
  const csvString = [
    ["Date", "Invested Time", "Approved Invested Time", "Pay", "Approved Pay"],
    ...sortedAndFilteredReports.map((item) => [
      item.date,
      item.investedTime,
      item.approvedInvestedTime,
      item.pay,
      item.approvedPay,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  const csvData = new Blob([csvString], { type: "text/csv" });
  const csvUrl = URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = csvUrl;
  link.download = "ActivityReports.csv";
  link.click();
};

export default sortedAndFilteredReportsToCsv;
