import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_IS_PERSISTED = "SET_IS_PERSISTED"
const SET_HIT_COMPONENT = "SET_HIT_COMPONENT"
const SET_SELECTED_INDEX = "SET_SELECTED_INDEX"
const SET_IS_VIEW_EXPANDED = "SET_IS_VIEW_EXPANDED"

export const setSelectedIndex = actionCreator<{selectedIndex: number}>(SET_SELECTED_INDEX)
export const setIsPersisted = actionCreator<{isPersisted: boolean}>(SET_IS_PERSISTED)
export const setHitComponent = actionCreator<{currentHitComponent: string}>(SET_HIT_COMPONENT)
export const setIsViewExpanded = actionCreator<{isViewExpanded: boolean}>(SET_IS_VIEW_EXPANDED)
