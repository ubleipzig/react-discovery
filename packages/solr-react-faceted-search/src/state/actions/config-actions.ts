import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_IS_PERSISTED = "SET_IS_PERSISTED"
const SET_HIT_COMPONENT = "SET_HIT_COMPONENT"
const SET_SELECTED_INDEX = "SET_SELECTED_INDEX"

export const setSelectedIndex = actionCreator<{selectedIndex: number}>(SET_SELECTED_INDEX)
export const setIsPersisted = actionCreator<{isPersisted: boolean}>(SET_IS_PERSISTED)
export const setHitComponent = actionCreator<{currentHitComponent: string}>(SET_HIT_COMPONENT)
