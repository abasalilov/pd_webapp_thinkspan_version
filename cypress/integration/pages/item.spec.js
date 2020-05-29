// p3 fa fa-shopping-cart fa-stack-1x xfa-inverse

/* eslint-disable no-undef */
// / <reference types="cypress" />

context('Results Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-15')
        cy.wait(2000)
        cy.get('[id="vin"]')
            .clear()
            .type("1N4AL3AP4DC295509")
        cy.get('[data-id="decodebtn"]').click()
        cy.wait(750)
        cy.get('[placeholder="Enter Part Name"]')
            .type("oil filter")
        cy.wait(750)
        cy.get('[id="searchbtn"]').click()
        cy.wait(3000)
        cy.get('[class="img-fluid"]')
            .eq(1)
            .invoke('show')
        cy.get('[id="review-item"]')
            .eq(1)
            .invoke('show')
            .click({ force: true })
    })

    it("Item title contains search term", () => {
        cy.get('[class="compatabilityList"]')
            .should('have.text', 'Compatability:Year : 2013Make : NissanModel : Altima')
        cy.get('[id="itemName"]')
            .contains('Oil Filter')
    })

    it("Item has multiple, navigable images", () => {
        cy.pause()
        cy.get('[id="arrow-right"]')
            .click({ force: true })
        cy.wait(1000)
        cy.pause()

        cy.get('[id="arrow-left"]')
            .click({ force: true })
        cy.wait(1000)

    })
})
