
///<reference types="Cypress"/>
it('',()=>{
cy.visit('https://demoqa.com/')
Cypress.on("uncaugh:exception",(err,runnable)=>{
    return false;
})

})