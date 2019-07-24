describe('react-discovery redux state management', (): void => {
  it('has expected state on load', (): void => {
    cy.fixture('defaultTestState').as('testState').then((json): void => {
      cy.visit('/', {
        onBeforeLoad: (win): void => {
          (win as any).initialState = json
        }
      })
    })
  })
  it('has expected config state on load', (): void => {
    cy.fixture('defaultTestState').as('testState').then((json): void => {
      (cy as any).window().its('store').invoke('getState')
        .its('config').should('deep.equal', json.config)
    })
  })
  it('has expected query state on load', (): void => {
    cy.fixture('defaultTestState').as('testState').then((json): void => {
      (cy as any).window().its('store').invoke('getState')
        .its('query').should('deep.equal', json.query)
    })
  })
  it('has expected response aggregations state on load', (): void => {
    cy.fixture('defaultTestState').as('testState').then((json): void => {
      (cy as any).window().its('store').invoke('getState')
        .its('response').its('aggregations').its('type_s').its('buckets')
        .should('deep.equal', json.response.aggregations.type_s.buckets)
    })
  })
  it('has expected response hits state on load', (): void => {
    cy.fixture('defaultTestState').as('testState').then((json): void => {
      (cy as any).window().its('store').invoke('getState')
        .its('response').its('hits').its('hits').each((hit): void => {
          expect(hit._source.format_s).to.deep.equal(json.response.hits.hits[0]._source.format_s)
        })
    })
  })
  it('sets expected currentLanguage in configuration ', (): void => {
    const cyp: any = cy
    cy.fixture('defaultTestState').as('testState').then((): void => {
      cyp.window()
        .its('store').invoke('dispatch',
          {payload: {currentLanguage: 'Balinese'}, type: 'SET_CURRENT_LANGUAGE'})
      cyp.window().its('store') // eslint-disable-line
        .invoke('getState').its('config').its('currentLanguage')
        .should('equal', 'Balinese')
    })
  })
  it('returns undefined when property is not available in action creator', (): void => {
    const cyp: any = cy
    cy.fixture('defaultTestState').as('testState').then((): void => {
      cyp.window().its('store')
        .invoke('dispatch', {payload: {currentLanguag: 'Balinese'}, type: 'SET_CURRENT_LANGUAGE'})
      cyp.wrap({ payload: undefined }) // eslint-disable-line
        .its('currentLanguag').should('be.undefined')
    })
  })
})


