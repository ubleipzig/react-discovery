describe('react-discovery redux state management', () => {
  it('has expected state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.visit('/', {
        onBeforeLoad: (win) => {
          win.initialState = json
        }
      })
    })
  })
  it('has expected config state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('config').should('deep.equal', json.config)
    })
  })
  it('has expected query state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('query').should('deep.equal', json.query)
    })
  })
  it('has expected response aggregations state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('response').its('aggregations').its('type_s').its('buckets')
        .should('deep.equal', json.response.aggregations.type_s.buckets)
    })
  })
  it('has expected response hits state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('response').its('hits').its('hits').each((hit) => {
          expect(hit._source.format_s).to.deep.equal(json.response.hits.hits[0]._source.format_s)
        })
    })
  })
  it('has expected suggestions state on load', () => {
    cy.fixture('defaultTestState').as('testState').then((json) => {
      cy.window().its('store').invoke('getState')
        .its('suggestions')
        .should('deep.equal', json.suggestions)
    })
  })
  it('sets expected currentLanguage in configuration ', () => {
    cy.fixture('defaultTestState').as('testState').then(() => {
      cy.window().its('store')
        .invoke('dispatch', {payload: {currentLanguage: 'Balinese'}, type: 'SET_CURRENT_LANGUAGE'})
      cy.window().its('store')
        .invoke('getState').its('config').its('currentLanguage')
        .should('equal', 'Balinese')
    })
  })
  it('returns undefined when property is not available in action creator', () => {
    cy.fixture('defaultTestState').as('testState').then(() => {
      cy.window().its('store')
        .invoke('dispatch', {payload: {currentLanguag: 'Balinese'}, type: 'SET_CURRENT_LANGUAGE'})
      cy.wrap({ payload: undefined }).its('currentLanguag').should('be.undefined')
    })
  })
})


