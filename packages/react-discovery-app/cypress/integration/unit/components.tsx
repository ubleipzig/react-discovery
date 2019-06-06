import { fireEvent, render } from '@testing-library/react'
import {Provider} from 'react-redux'
import React from 'react'
import {TabsAppBar} from '../../../src/components'
import {createStore} from "redux"
import {rootReducer} from '../../../src/state'

const renderWithRedux = (ui, {store = createStore(rootReducer())} = {}): any => {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  }
}

it('clicks person tab and is selected', (): void => {
  const {getByText, store} = renderWithRedux(<TabsAppBar />)
  fireEvent.click(getByText('Person'))
  expect(store.getState().query.filters.type_s[0]).to.equal('Person')
})
