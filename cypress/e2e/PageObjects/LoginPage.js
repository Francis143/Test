class LogingPage{

userName(value){
    cy.get('#username').type(value)
}
password(value){
    cy.get('#password').type(value)
}

loginBtn(){
    cy.get('#login').click()
}


}
export default LogingPage