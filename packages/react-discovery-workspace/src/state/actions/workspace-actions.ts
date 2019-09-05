import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_WORKSPACE_LAYOUT = "SET_WORKSPACE_LAYOUT"
const SET_WORKSPACE_STATE = "SET_WORKSPACE_STATE"
const SET_VIEW_ID_MAP = "SET_VIEW_ID_MAP"
const REMOVE_VIEW_ID = "REMOVE_VIEW_ID"

export const setWorkspaceLayout = actionCreator<{layout: any}>(SET_WORKSPACE_LAYOUT)
export const setViewIdMap = actionCreator<{collection: string; id: string; manifest?: string; type: string}>(SET_VIEW_ID_MAP)
export const removeViewId = actionCreator<{id: string}>(REMOVE_VIEW_ID)
export const setWorkspaceState = actionCreator<{workspace: any}>(SET_WORKSPACE_STATE)
