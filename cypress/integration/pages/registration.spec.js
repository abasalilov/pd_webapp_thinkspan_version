// /* eslint-disable no-undef */

// function makeid(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     for (let i = 0; i < length; i++) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
// }


// context('Registration Page', () => {
//     beforeEach(() => {
//         cy.visit('http://localhost:3000/#/login');
//         cy.viewport('macbook-15')
//         cy.wait(3000)
//         cy.get('[class="reg_link"]')
//             .click({ force: true })
//     })

//     it('User should be able to navigate to registration form', () => {
//         cy.get('[class="remember-checkbox"]')
//             .should('have.text', 'Accept our  privacy policy and  customer agreement')
//     })

//     it('User should NOT be able to register using a currently registered email', () => {
//         cy.get('[type="email"]')
//             .type("aleks@partsdetect.com")

//         cy.wait(100)

//         cy.get('[placeholder="Name"]')
//         .type("A")

//         cy.get('[class="mbsc-err-msg"]')
//             .should('have.text', 'This email already associated with an existing account')
//     })

//     it('User should be able to register', () => {
//         const fakeName = makeid(6);
//         cy.get('[placeholder="Name"]')
//             .type("Aleks Basalilov")

//         cy.get('[type="email"]')
//             .type(`${fakeName}@pd.com`)

//         cy.get('[type="password"]')
//             .first()
//             .type(fakeName)

//         cy.get('[type="password"]')
//             .eq(1)
//             .type(fakeName)

//         cy.get('[placeholder="Start typing address..."]')
//             .type("1042 Sheppard Rd, Walnut Creek, CA, USA")

//         cy.get('[class="remember-checkbox"]')
//             .click({ force: true })

//         cy.get('[data-icon="checkmark"]')
//             .click({ force: true })

//         cy.get('[class="section-title"]')
//             .should('have.text', 'Welcome to Parts Detect')
//     })
// })
