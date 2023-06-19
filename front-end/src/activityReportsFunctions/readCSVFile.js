const readCSVFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n");
      const headers = rows[0].split(",").map((header) => header.trim());

      const data = rows.slice(1).map((row) => {
        const values = row
          .split(",")
          .map((value) => value.trim().replace(/\r$/, ""));
        const obj = {};

        headers.forEach((header, index) => {
          obj[header] = values[index];
        });

        return obj;
      });

      resolve(data);
    };

    reader.onerror = (event) => {
      reject(new Error("Error occurred while reading the CSV file."));
    };

    reader.readAsText(file);
  });
};

export default readCSVFile;
