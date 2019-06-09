/* global cy */
describe('React Discovery Base', (): void => {
  beforeEach((): void => {
    cy.visit('/')
  })
  it('clicks tabs', (): void => {
    cy.get('[data-testid=tab-1]').click()
    cy.get('[data-testid=tab-0]').should('have.attr', 'aria-selected', 'false')
    cy.get('[data-testid=tab-0]').click({ force: true })
    cy.get('[data-testid=tab-1]').should('have.attr', 'aria-selected', 'false')
  })
  it('changes page index', (): void => {
    cy.get('[data-testid=page-index-3]').click({ multiple: true })
    cy.get('[data-testid=page-index-2]').should(($div): void => {
      expect($div).to.have.length(2)
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
    cy.get('[data-testid=page-control-last]').click({ multiple: true })
    cy.get('[data-testid=page-control-last]').should(($div): void => {
      expect($div).to.have.length(2)
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
  })
  it('enters text in standard search box, submits form, and clears text', (): void => {
    cy.get('input#standard-full-width').type('Astana')
    cy.get('input#standard-full-width').should('have.value', 'Astana')
    cy.get('[data-testid=clear-searchbox]').should('have.length', 1)
    cy.get('[data-testid=standard-searchform]').submit()
    cy.get('[data-testid=clear-searchbox]').click()
    cy.get('input#standard-full-width').should('have.value', '')
  })
  it('changes search mode, enters text, clears text, enters new text and submits form', (): void => {
    cy.get('[data-testid=search-settings-menu]').click()
    cy.get('[data-testid=search-settings-menu-item-1]').click()
    cy.get('input#expert-full-width').type('Astana')
    cy.get('input#expert-full-width').should('have.value', 'Astana')
    cy.get('[data-testid=clear-searchbox]').should('have.length', 1)
    cy.get('[data-testid=clear-searchbox]').click()
    cy.get('input#expert-full-width').should('have.value', '')
    cy.get('input#expert-full-width').type('Banjul')
    cy.get('[data-testid=expert-searchform]').submit()
    cy.get('input#expert-full-width').should('have.value', 'Banjul')
  })
  it('gets relations', (): void => {
    cy.get('[data-testid=tab-3]').click()
    cy.get('[data-testid=relations]').first().click({ force: true })
    cy.get('[data-testid=tab-1]').should('have.attr', 'aria-selected', 'true')
  })
  it('orders items', (): void => {
    cy.get('[data-testid=sorting-order-desc]').click()
    cy.get('[data-testid=sorting-order-asc]').should('exist')
    cy.get('[data-testid=sorting-order-asc]').click()
    cy.get('[data-testid=sorting-order-desc]').should('exist')
  })
  it('sorts items', (): void => {
    cy.get('select#sort-native-simple')
      .select('Status').should('have.value', 'status_t')
  })
  it('expands view', (): void => {
    cy.get('[data-testid=tab-1]').click()
    cy.get('[data-testid=view-switcher-toggle]').first().click()
    cy.get('[data-testid=view-switcher-toggle]').first().within((): void => {
      cy.get('input').should('have.attr', 'checked')
    })
  })
})
