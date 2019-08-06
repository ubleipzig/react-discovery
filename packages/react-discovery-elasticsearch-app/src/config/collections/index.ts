import deepmerge from 'deepmerge'
import {harvard} from './harvard'
import {hsp2} from './hsp2'
import {ox1} from './ox'
import {ubl} from './ubl'
export const collections = deepmerge.all([harvard, hsp2, ox1, ubl])
