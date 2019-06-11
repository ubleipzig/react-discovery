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
