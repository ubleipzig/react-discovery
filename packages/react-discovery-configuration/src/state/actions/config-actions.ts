import actionCreatorFactory from 'typescript-fsa';
import {asyncFactory} from 'typescript-fsa-redux-thunk';
const actionCreator = actionCreatorFactory()


const SET_CURRENT_LANGUAGE = "SET_CURRENT_LANGUAGE"
const SET_IS_PERSISTED = "SET_IS_PERSISTED"
const SET_HIT_COMPONENT = "SET_HIT_COMPONENT"
const SET_SELECTED_INDEX = "SET_SELECTED_INDEX"
const SET_IS_VIEW_EXPANDED = "SET_IS_VIEW_EXPANDED"
const SET_IS_ITEM_EXPANDED = "SET_IS_ITEM_EXPANDED"

export const setSelectedIndex = actionCreator<{selectedIndex: number}>(SET_SELECTED_INDEX)
export const setCurrentLanguage = actionCreator<{currentLanguage: string}>(SET_CURRENT_LANGUAGE)
export const setIsPersisted = actionCreator<{isPersisted: boolean}>(SET_IS_PERSISTED)
export const setHitComponent = actionCreator<{currentHitComponent: string}>(SET_HIT_COMPONENT)
export const setIsViewExpanded = actionCreator<{isViewExpanded: boolean}>(SET_IS_VIEW_EXPANDED)
export const setIsItemExpanded = actionCreator<{id: string; isItemExpanded: boolean}>(SET_IS_ITEM_EXPANDED)
