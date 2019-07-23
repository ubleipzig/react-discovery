import actionCreatorFactory from 'typescript-fsa';
const actionCreator = actionCreatorFactory()

const SET_WORKSPACE_LAYOUT = "SET_WORKSPACE_LAYOUT"

export const setWorkspaceLayout = actionCreator<{layout: any}>(SET_WORKSPACE_LAYOUT)

