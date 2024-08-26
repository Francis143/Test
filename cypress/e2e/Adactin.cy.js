// cypress/e2e/your-test.spec.js

// const filePath = 'cypress/fixtures/excelData.xlsx';
// const sheetName = 'Sheet1'; // Name of the sheet to update
import Index from "./PageObjects/Index";
import LogingPage from "./PageObjects/LoginPage";
import Searchhotel from "./PageObjects/SearchHotel";
for (let i = 2; i <= 2; i++) {


  describe(`Write Specific Cell to Excel Test-${i}`, () => {
    before('Before', () => {
      cy.log('this is before block')
      cy.task('readXlsx', { file: 'cypress/fixtures/Adactin.xlsx', sheet: "Sheet1" }).then((rows) => {
        let rowsLength = rows.length;
        cy.writeFile("cypress/fixtures/Adactin.json", { rows })
      })
    })
    it('should write a value to a specific cell in an Excel file', () => {
      const lp = new LogingPage()
      const sh = new Searchhotel()
      cy.visit("https://adactinhotelapp.com/index.php")
      cy.fixture('Adactin').then((data) => {

        if(data.rows[i-2].username!=''){
          lp.userName(data.rows[i-2].username)
          lp.password("Francis@123")

        }
        

      })

      // lp.userName("Francis3535")
      // lp.password("Francis@123")
      lp.loginBtn()
      sh.location("Sydney")
      sh.hotel("Hotel Creek")
      sh.roomType("Double")

      cy.get(':nth-child(3) > [align="right"]').then((data) => {
        const x = data.text();
        cy.log(x)
      })

























      const filePath = 'cypress/fixtures/Adactin.xlsx';
      const sheetName = 'Sheet1'; // Name of the sheet to update
      const cell = `C${i}`; // Cell address in format "A1"
      const value = 'Success';

      cy.task('writeToExcel', { filePath, sheetName, cell, value }).then(() => {
        cy.log(`Value "${value}" written to cell ${cell} in sheet "${sheetName}".`);
      });
    });
  });
}

