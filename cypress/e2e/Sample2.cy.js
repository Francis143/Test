// cypress/e2e/your-test.spec.js

// const filePath = 'cypress/fixtures/excelData.xlsx';
// const sheetName = 'Sheet1'; // Name of the sheet to update
import Index from "./PageObjects/Index";
import LogingPage from "./PageObjects/LoginPage";
for (let i = 2; i <= 7; i++) {


  describe(`Write Specific Cell to Excel Test-${i}`, () => {
    it('should write a value to a specific cell in an Excel file', () => {
      const lp = new LogingPage()
      cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
      lp.userName('Admin')
      lp.password("admin123")
      lp.loginBtn()

      //Verify the Home page url contains "Index"
      cy.url().should('include', '/index')
      const ip = new Index()
      ip.adminMenu()
      ip.PIMMenu()
      ip.LeaveMenu()
      ip.TimeMenu()
      // ip.Recruitment()
























      const filePath = 'cypress/fixtures/excelData.xlsx';
      const sheetName = 'Sheet1'; // Name of the sheet to update
      const cell = `S${i}`; // Cell address in format "A1"
      const value = 'Francis Sanjon';

      cy.task('writeToExcel', { filePath, sheetName, cell, value }).then(() => {
        cy.log(`Value "${value}" written to cell ${cell} in sheet "${sheetName}".`);
      });
    });
  });
}

