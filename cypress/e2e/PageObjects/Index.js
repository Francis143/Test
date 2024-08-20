class Index {

    adminMenu() {
        cy.get(':nth-child(1) > .oxd-main-menu-item').click()
    }
    PIMMenu() {
        cy.get(':nth-child(2) > .oxd-main-menu-item').click()
    }
    LeaveMenu() {
        cy.get(':nth-child(3) > .oxd-main-menu-item').click()
    }
    TimeMenu() {
        cy.get(':nth-child(4) > .oxd-main-menu-item').click()
    }

    Recruitment() {
        cy.get(':nth-child(5) > .oxd-main-menu-item1').click()
    }



}

export default Index