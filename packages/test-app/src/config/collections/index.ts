import deepmerge from 'deepmerge'
import {gettingstarted} from './gettingstarted'
import {hsp} from './hsp'
import {newTest} from './newTest'
export const collections = deepmerge.all([gettingstarted, hsp, newTest])
