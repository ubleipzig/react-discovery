import {stringify} from 'query-string'

export const pushHistory = (navigation, stringInput, start, rootContext): any => {
  const search = (stringInput && start) ? {
    q: stringInput,
    start
  } : !start && stringInput ? {q: stringInput} : start ? {start} : null

  const url = {
    pathname: rootContext,
    search: `?${stringify(search)}`,
  }
  navigation.navigate(url)
}

export const buildQueryStringObject = (route, urlStart) => {
  return route.url.query.q && urlStart ? {
    from: urlStart,
    stringInput: route.url.query.q ? route.url.query.q : null
  } : route.url.query.q ? {
    stringInput: route.url.query.q ? route.url.query.q : null
  } : {}
}
