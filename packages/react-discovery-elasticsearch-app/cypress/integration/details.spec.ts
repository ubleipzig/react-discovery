/* global cy */
describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit('/')
  })
  it('access primary type detail view', (): void => {
    cy.get('[data-testid=detail-link]').first().click()
    cy.get('[data-testid=detail-result-link]').should('exist')
  })
})
