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
  it('changes language', (): void => {
    cy.get('[data-testid=language-settings-menu]').click()
    cy.get('[data-testid=language-settings-menu-item-1]').click({ force: true })
    cy.get('[data-testid=language-settings-menu-item-1]').click().should(($div): void => {
      const className = $div[0].className
      expect(className).to.match(/Mui-selected/)
    })
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
    cy.get('[data-testid=view-switcher-toggle]').first().click({ force: true })
      .then((): void => {
        cy.get('[data-testid=view-switcher-toggle]').first().should(($span): void => {
          const className = $span[0].className
          expect(className).to.match(/Mui-checked/)
        })
      })
  })
  it('clears selected filter', (): void => {
    cy.get('[data-testid=selected-filter]').within((): void => {
      cy.get('svg').click()
    })
    cy.get('[data-testid=selected-filter]').should('not.exist')
  })
  it('expands item list and selects item filter', (): void => {
    cy.get('[data-testid=item-list-expansion-panel]').first().within((): void => {
      cy.get('[role="button"]').click()
    })
    cy.get('[data-testid=item-list-expansion-panel]').first().should(($div): void => {
      expect($div).to.have.length(1)
      const className = $div[0].className
      expect(className).to.match(/Mui-expanded/)
    })
    cy.get('[data-testid=item-0]').first().click()
    cy.get('[data-testid=selected-filter]').should(($div): void => {
      expect($div).to.have.length(2)
    })
    cy.get('[data-testid=item-1]').first().click({ force: true })
    cy.get('[data-testid=selected-filter]').should(($div): void => {
      expect($div).to.have.length(3)
    })
  })
  it('enters text in suggester, selects suggestion and clears it', (): void => {
    cy.get('input#downshift-simple-input').type('Erat')
    cy.get('input#downshift-simple-input').should('have.value', 'Erat')
    cy.get('div#downshift-simple-item-0').click()
    cy.get('[data-testid=suggestion]').should('exist')
    cy.get('[data-testid=suggestion]').within((): void => {
      cy.get('svg').click()
    })
    cy.get('[data-testid=suggestion]').should('not.exist')
  })
  it('resets query state', (): void => {
    cy.get('[data-testid=reset]').click()
  })
})
