import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()
const SET_URL = 'SET_URL'

export const setUrl = actionCreator<{url: string}>(SET_URL)
