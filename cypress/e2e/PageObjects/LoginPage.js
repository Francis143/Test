class LogingPage{

userName(value){
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(value)
}
password(value){
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(value)
}

loginBtn(){
    cy.get('.oxd-button').click()
}


}
export default LogingPage