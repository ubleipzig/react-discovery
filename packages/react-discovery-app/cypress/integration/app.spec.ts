/* global cy */
describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit('/')
  })
  it('clicks tabs', (): void => {
    cy.get('[data-cy=tab-1]').click()
    cy.get('[data-cy=tab-0]').should('have.attr', 'aria-selected', 'false')
  })
  it('changes page index', (): void => {
    cy.get('[data-cy=page-index-3]').click({ multiple: true })
    cy.get('[data-cy=page-index-2]').should(($div): void => {
      expect($div).to.have.length(2)
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
    cy.get('[data-cy=page-control-last]').click({ multiple: true })
    cy.get('[data-cy=page-control-last]').should(($div): void => {
      expect($div).to.have.length(2)
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
  })
  it('enters text in standard search box, submits form, and clears text', (): void => {
    cy.get('input#standard-full-width').type('Astana')
    cy.get('input#standard-full-width').should('have.value', 'Astana')
    cy.get('[data-cy=clear-searchbox]').should('have.length', 1)
    cy.get('[data-cy=standard-searchform]').submit()
    cy.get('[data-cy=clear-searchbox]').click()
    cy.get('input#standard-full-width').should('have.value', '')
  })
  it('changes search mode, enters text, clears text, enters new text and submits form', (): void => {
    cy.get('[data-cy=search-settings-menu]').click()
    cy.get('[data-cy=search-settings-menu-item-1]').click()
    cy.get('input#expert-full-width').type('Astana')
    cy.get('input#expert-full-width').should('have.value', 'Astana')
    cy.get('[data-cy=clear-searchbox]').should('have.length', 1)
    cy.get('[data-cy=clear-searchbox]').click()
    cy.get('input#expert-full-width').should('have.value', '')
    cy.get('input#expert-full-width').type('Banjul')
    cy.get('[data-cy=expert-searchform]').submit()
    cy.get('input#expert-full-width').should('have.value', 'Banjul')
  })
})
