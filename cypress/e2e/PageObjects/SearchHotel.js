class Searchhotel{

location(val){
    cy.get('#location').select(val)
}

hotel(val){
    cy.get('#hotels').select(val)
}
roomType(val){
    cy.get('#room_type').select(val)
}


}

export default Searchhotel