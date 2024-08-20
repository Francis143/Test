// cypress.config.js or cypress/plugins/index.js
const { defineConfig } = require('cypress');
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const readXlsx = require('./cypress/support/read-xlsx');

async function setupNodeEvents(on, config) {
  on('task', {
    parseXlsx({ filePath }) {
      return new Promise((resolve, reject) => {
        try {
          const workbook = XLSX.readFile(filePath);
          const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
          resolve(jsonData);
        } catch (e) {
          reject(e);
        }
      });
    },
    readXlsx: readXlsx.read,
    writeToExcel({ filePath, sheetName, cell, value }) {
      try {
        let workbook;
        if (fs.existsSync(filePath)) {
          workbook = XLSX.readFile(filePath);
        } else {
          workbook = XLSX.utils.book_new();
        }
        
        let worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          worksheet = {};
          workbook.SheetNames.push(sheetName);
          workbook.Sheets[sheetName] = worksheet;
        }

        // Convert cell address (e.g., "A1") to cell reference
        worksheet[cell] = { v: value, t: 's' };

        XLSX.writeFile(workbook, filePath);
        return null;
      } catch (e) {
        throw new Error(`Error writing to Excel file: ${e.message}`);
      }
    }
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  projectId: 'uiihvd',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'mochawesome-report',
    overwrite: false,
    html: false,
    json: true,
  },
  e2e: {
    setupNodeEvents,
  },
});
