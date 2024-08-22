
// for(let i=1;i<=2;i++){
//     describe(`Suite ${i}`, () => {
//         it('Test', () => {
//             const screenshotPath = 'cypress/screenshots/image.png'; // Update with your actual screenshot path
//             const docPath = 'cypress/downloads/test-document.docx'; // Path for the Word document
    
//             // Visit the webpage
//             cy.visit("https://adactinhotelapp.com/index.php");
    
//             // Take a screenshot
//             cy.screenshot('image');
    
//             // Use cy.task to create the Word document
//             cy.task('createWordDocument', { screenshotPath, docPath });
//         });
//     });
    
// }

describe('Suite', () => {
    before(() => {
      // Ensure any previous documents are finalized
      cy.task('finalizeDocument');
    });
    for(let i=1;i<=5;i++){
    it('Test', () => {
      // Visit the webpage
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
  cy.wait(3000)
      // Take a screenshot
      cy.screenshot(`image${i}`);
      cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
      cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
      cy.get('.oxd-button').click()
      cy.wait(3000)
      cy.screenshot(`image${i}`);
      cy.get(':nth-child(1) > .oxd-main-menu-item').click()
      cy.screenshot(`image${i}`);
    });
}
    after(() => {
      // Finalize the document after all tests
      cy.task('finalizeDocument');
    });
  });
  
