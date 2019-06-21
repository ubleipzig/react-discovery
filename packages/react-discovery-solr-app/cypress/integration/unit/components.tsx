import {fireEvent, render} from '@testing-library/react'
import {Provider} from 'react-redux'
import React from 'react'
import {TabsAppBar} from '@react-discovery/components'
import {createStore} from "redux"
import {rootReducer} from '../../../src/state'

const renderWithRedux = (ui, {store = createStore(rootReducer())} = {}): any => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

it('clicks person tab and changes state', (): void => {
  const {getByTestId, store} = renderWithRedux(<TabsAppBar />)
  fireEvent.click(getByTestId('tab-4'))
  expect(store.getState().query.filters.type_s[0]).to.equal('Person')
})

