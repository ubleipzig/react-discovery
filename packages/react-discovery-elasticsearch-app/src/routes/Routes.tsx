import {DiscoveryApp, Landing, ResultsList, Settings, Workspace} from "../components"
import {getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap} from "@react-discovery/workspace"
import {mount, route} from "navi"
import {Collections} from "../components/Collections"
import {DetailView} from "@react-discovery/views"
import React from "react"

const detailViewActions = {
  getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap
}

export const routes =
  mount({
    '/': route({
      title: "Home",
      view: <DiscoveryApp component={<Landing />}/>,
    }),
    '/collections': route({
      title: "Collections",
      view: <DiscoveryApp component={<Collections />}/>,
    }),
    '/detail/:collection/:id': route((req): any => {
      let id = req.params.id
      const collection = req.params.collection
      return {
        view: <DiscoveryApp component={<DetailView actions={detailViewActions} collection={collection} id={id}/>}/>,
      }
    }),
    '/search/:collection': route({
      title: "React Discovery",
      view: <DiscoveryApp component={<ResultsList />}/>,
    }),
    '/settings': route((): any => {
      return {
        view: <DiscoveryApp component={<Settings />}/>,
      }
    }),
    '/workspace': route((): any => {
      return {
        view: <DiscoveryApp component={<Workspace />}/>,
      }
    })
  })
