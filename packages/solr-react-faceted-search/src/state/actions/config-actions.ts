import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()
const SET_SELECTED_INDEX = "SET_SELECTED_INDEX"

export const setSelectedIndex = actionCreator<{selectedIndex: number}>(SET_SELECTED_INDEX)

