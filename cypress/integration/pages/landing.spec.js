/* eslint-disable no-undef */
// / <reference types="cypress" />

context('Landing Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.viewport('macbook-15')
        cy.wait(2000)
    })

    it('Drop Down Select search should return Rav4 Oil Filters', () => {
        cy.get('[id="yeardd"]')
            .select("2007")
        cy.wait(750)
        cy.get('[id="makedd"]')
            .select("448")
        cy.wait(750)
        cy.get('[id="modeldd"]')
            .select("2217")
        cy.wait(750)
        cy.get('[id="trimsdd"]')
            .select("V6")
        cy.wait(750)
        cy.get('[id="vehicle-found"]')
            .should('have.text', 'Vehicle Found: 2007 Toyota RAV4')
        cy.get('[placeholder="Enter Part Name"]')
            .type("oil filter")
        cy.wait(750)
        cy.get('[id="searchbtn"]').click() 
        cy.wait(3000)
        cy
            .get('[id="search-results"]')     // this yields us a jquery object
            .children()
            .its('length')      // calls 'length' property returning that value
            .should('be.gt', 10)
    })

    it('Search By Vin should return Alitma Oil Filters', () => {
        cy.get('[id="vin"]')
            .clear()
            .type("1N4AL3AP4DC295509")
        cy.get('[data-id="decodebtn"]').click()
        cy.wait(750)
        cy.get('[id="vehicle-found"]')
            .should('have.text', 'Vehicle Found: 2013 NISSAN Altima')

        cy.get('[placeholder="Enter Part Name"]')
            .type("oil filter")
        cy.wait(750)
        cy.get('[id="searchbtn"]').click()
        cy.wait(3000)
        cy
            .get('[id="search-results"]')     // this yields us a jquery object
            .children()
            .its('length')      // calls 'length' property returning that value
            .should('be.gt', 10)
    })
})
