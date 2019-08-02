import deepmerge from 'deepmerge'
import {hsp2} from './hsp2'
import {ox1} from './ox'
export const collections = deepmerge.all([hsp2, ox1])
