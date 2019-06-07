/* global cy */
describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit('/')
  })
  it('clicks tabs', (): void => {
    cy.get('[data-cy=tab-1]').click()
    cy.get('[data-cy=tab-0]').should('have.attr', 'aria-selected', 'false')
  })
  it('changes page', (): void => {
    cy.get('[data-cy=page-index-3]').click({ multiple: true })
    cy.get('[data-cy=page-index-2]').should(($div): void => {
      expect($div).to.have.length(2)
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
  })
  it('enters text in standard search box and clears it', (): void => {
    cy.get('input#standard-full-width').type('Astana')
    cy.get('input#standard-full-width').should('have.value', 'Astana')
    cy.get('[data-cy=clear-searchbox]').should('have.length', 1)
    cy.get('[data-cy=clear-searchbox]').click()
    cy.get('input#standard-full-width').should('have.value', '')
  })
})
