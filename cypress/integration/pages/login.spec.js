/* eslint-disable no-undef */

const pw = require("../../pw.js")

context('Login Page', () => {
    beforeEach(() => {
        console.log("pw", pw)
        cy.visit('http://localhost:3000/#/login');
        cy.viewport('macbook-15')
        cy.wait(3000)
    })

    it('User should be able to login', () => {
        cy.get('[type="email"]')
            .type("stan@partsdetect.com")
        cy.get('[type="password"]')
            .type(pw.pw)

        cy.get('[data-icon="checkmark"]')
            .click({ force: true })

        cy.get('[class="section-title"]')
            .should('have.text', 'Dashboard')
    })

    it('User should be able to navigate to registration form', () => {
        cy.get('[class="reg_link"]')
            .click({ force: true })
        cy.get('[class="remember-checkbox"]')
            .click({ force: true })
            .should('have.text', 'Accept our  privacy policy and  customer agreement')
    })
})
