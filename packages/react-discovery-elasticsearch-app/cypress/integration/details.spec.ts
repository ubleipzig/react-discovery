/* global cy */
describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit('/')
  })
  it('access primary type detail view', (): void => {
    cy.get('[data-testid=detail-link]').first().click()
    cy.get('[data-testid=detail-result-link]').should('exist')
  })
  it('access secondary type detail view', (): void => {
    cy.get('[data-testid=tab-2]').click()
    cy.get('[data-testid=detail-link]').first().click({ force: true })
    cy.get('[data-testid=detail-result-link]').should('exist')
  })
  it('access tertiary type detail view', (): void => {
    cy.get('[data-testid=tab-3]').click()
    cy.get('[data-testid=detail-link]').first().click({ force: true })
    cy.get('[data-testid=detail-result-link]').should('exist')
  })
  it('access quarterary type detail view and click related items', (): void => {
    cy.get('[data-testid=tab-4]').click({ force: true })
    cy.wait(500)
    cy.get('[data-testid=detail-link]').first().click()
    cy.get('[data-testid=detail-result-link]').should('exist')
    cy.get('[data-testid=detail-relations]').first().click({ force: true })
    cy.get('[data-testid=tab-0]').should('have.attr', 'aria-selected', 'true')
  })
  it('navigates to root with breadcrumbs', (): void => {
    cy.get('[data-testid=detail-link]').first().click()
    cy.get('[data-testid=detail-search-link]').click({ force: true })
    cy.get('[data-testid=tab-0]').should('have.attr', 'aria-selected', 'true')
  })
})
