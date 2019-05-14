import deepmerge from 'deepmerge'
import {gettingstarted} from './gettingstarted'
import {hsp} from './hsp'
export const collections = deepmerge.all([gettingstarted, hsp])
