// const { defineConfig } = require('cypress');
// const fs = require('fs');
// const path = require('path');
// const DocxTemplate = require('docx-templates');
// const { Document, Packer, ImageRun } = require('docx');

// async function setupNodeEvents(on, config) {
//   on('task', {
//     async createWordDocument({ screenshotPath, docPath }) {
//       if (!fs.existsSync(screenshotPath)) {
//         console.error(`Screenshot not found at ${screenshotPath}`);
//         throw new Error(`Screenshot not found at ${screenshotPath}`);
//       }

//       const imageBuffer = fs.readFileSync(screenshotPath);

//       try {
//         // Load the template document
//         const templatePath = path.resolve('path/to/your/template.docx');
//         const templateBuffer = fs.readFileSync(templatePath);

//         // Create a new document from the template
//         const doc = new DocxTemplate(templateBuffer);

//         // Replace placeholder with image
//         const imageBase64 = imageBuffer.toString('base64');
//         const image = `data:image/png;base64,${imageBase64}`;

//         const updatedDocument = doc.render({
//           image_placeholder: image
//         });

//         // Save the updated document
//         fs.writeFileSync(docPath, updatedDocument);

//         console.log(`Document updated at ${docPath}`);
//         return null;
//       } catch (error) {
//         console.error('Error creating document:', error);
//         throw error;
//       }
//     }
//   });

//   return config;
// }

// module.exports = defineConfig({
//   projectId: 'uiihvd',
//   reporter: 'mochawesome',
//   reporterOptions: {
//     reportDir: 'mochawesome-report',
//     overwrite: false,
//     html: false,
//     json: true,
//   },
//   e2e: {
//     setupNodeEvents,
//   },
// });
