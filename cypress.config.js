const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, ImageRun } = require('docx');
const XLSX = require('xlsx'); // Add this import
const readXlsx = require('./cypress/support/read-xlsx');

const screenshotsFolder = 'cypress/screenshots';
const docPath = 'cypress/downloads/test-document.docx';

async function createDocumentWithScreenshots() {
  try {
    // Get all image files from the screenshots folder
    const files = fs.readdirSync(screenshotsFolder);

    // Filter and sort image files
    const imageFiles = files.filter(file => /\.(png|jpg|jpeg)$/i.test(file)).sort();

    // Read image files and reverse the order
    const imageBuffers = imageFiles.reverse().map(file => {
      const filePath = path.join(screenshotsFolder, file);
      return fs.readFileSync(filePath);
    });

    if (imageBuffers.length === 0) {
      console.log('No images found in screenshots folder.');
      return null; // Or handle it as needed
    }

    // Create the Word document with all images in reverse order
    const doc = new Document({
      sections: [{
        properties: {},
        children: imageBuffers.map(imageBuffer => 
          new Paragraph({
            children: [
              new ImageRun({
                data: imageBuffer,
                transformation: {
                  width: 600, // Adjust width as needed
                  height: 400 // Adjust height as needed
                }
              })
            ]
          })
        ),
      }],
    });

    // Pack the document and save it
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync(docPath, buffer);
    console.log(`Document created at ${docPath}`);
    return null; // Indicate success
  } catch (error) {
    console.error('Error creating document:', error);
    throw error; // Ensure the error is thrown to be caught by Cypress
  }
}
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
    },
    finalizeDocument() {
      return createDocumentWithScreenshots(); // Ensure this returns a promise
    }
  });

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
