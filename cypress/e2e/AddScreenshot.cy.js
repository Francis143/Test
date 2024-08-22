const fs = require('fs');
const path = require('path');
const { Document, Packer, Media } = require('docx');

describe('Suite', () => {
    it('Test', () => {
        const screenshotPath = 'cypress/screenshots/image.png'; // Update with your actual screenshot path
        const docPath = 'cypress/downloads/test-document.docx'; // Path for the Word document

        // Visit the webpage
        cy.visit("https://adactinhotelapp.com/index.php");

        // Take a screenshot
        cy.screenshot('image');

        // After taking the screenshot, create a Word document
        createWordDocument(screenshotPath, docPath);
    });
});

// Function to create a Word document and add the screenshot
function createWordDocument(screenshotPath, docPath) {
    // Ensure the screenshot file exists
    if (!fs.existsSync(screenshotPath)) {
        console.error(`Screenshot not found at ${screenshotPath}`);
        return;
    }

    // Create a new Word document
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Add the screenshot to the document
                Media.addImage(fs.readFileSync(screenshotPath), 600, 400),
            ],
        }],
    });

    // Pack the document and save it
    Packer.toBuffer(doc).then((buffer) => {
        fs.writeFileSync(docPath, buffer);
        console.log(`Document created at ${docPath}`);
    }).catch((error) => {
        console.error('Error creating document:', error);
    });
}
