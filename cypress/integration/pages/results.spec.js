// // p3 fa fa-shopping-cart fa-stack-1x xfa-inverse

// /* eslint-disable no-undef */
// // / <reference types="cypress" />

// context('Results Page', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000');
//         cy.viewport('macbook-15')
//         cy.wait(2000)
//         cy.get('[id="vin"]')
//             .clear()
//             .type("1N4AL3AP4DC295509")
//         cy.get('[data-id="decodebtn"]').click()
//         cy.wait(750)
//         cy.get('[placeholder="Enter Part Name"]')
//             .type("oil filter")
//         cy.wait(750)
//         cy.get('[id="searchbtn"]').click()
//         cy.wait(3000)
//     })

//     it('Item should have part name in title', () => {

//         cy.get('[id="itemName"]')
//         .first()
//             .contains('Oil Filter')
//     })

//     it("Item can add to cart", () => {
//         cy.get('[class="img-fluid"]')
//             .first()
//             .invoke('show')
//         cy.get('[id="add-to-cart-icon"]')
//             .first()
//             .invoke('show')
//             .click({ force: true })

//         cy.get('[class="img-fluid"]')
//             .eq(3)
//             .invoke('show')
//         cy.get('[id="add-to-cart-icon"]')
//             .eq(3)
//             .invoke('show')
//             .click({ force: true })

//         cy.get('[id="go-to-cart-btn"]')
//         .click()
//         cy.wait(2000)

//         cy.get('[class="cart-form__cart-item cart_item"]')
//         .its('length')      
//         .should('be', 3)

//     })

//     it("Item can be reviewed in detail", () => {
//         cy.get('[class="img-fluid"]')
//             .first()
//             .invoke('show')
//         cy.get('[id="review-item"]')
//             .first()
//             .invoke('show')
//             .click({ force: true })

//         cy.get('[class="compatabilityList"]')
//             .should('have.text', 'Compatability:Year : 2013Make : NissanModel : Altima')
//     })
// })
