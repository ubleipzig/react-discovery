import deepmerge from 'deepmerge'
import {gettingstarted} from './gettingstarted'
import {hsp} from './hsp'
import {test01} from './test01'
export const collections = deepmerge.all([gettingstarted, hsp, test01])
