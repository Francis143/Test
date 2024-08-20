// cypress/plugins/index.js
const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    writeToExcel({ filePath, sheetName, data }) {
      const absolutePath = path.resolve(filePath);

      // Ensure the directory exists
      const dir = path.dirname(absolutePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(sheetName);

      // Set up columns based on the keys of the first object
      const columns = Object.keys(data[0]).map((key) => ({ header: key, key }));
      worksheet.columns = columns;

      // Add rows
      data.forEach((row) => {
        worksheet.addRow(row);
      });

      return workbook.xlsx.writeFile(absolutePath)
        .then(() => {
          return null; // Indicate success
        })
        .catch((err) => {
          throw err;
        });
    }
  });
};
