import {stringify} from 'query-string'

export const pushHistory = (navigation, currentSearchContext, stringInput, start): any => {
  const search = (stringInput && start) ? {
    q: stringInput,
    start
  } : !start && stringInput ? {q: stringInput} : start ? {start} : null

  const url = {
    pathname: currentSearchContext,
    search: `?${stringify(search)}`,
  }
  navigation.navigate(url)
}

