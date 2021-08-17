import * as core from '@actions/core'
import yaml from 'js-yaml'

interface Inputs {
  data: any // eslint-disable-line @typescript-eslint/no-explicit-any
  template: string
  target: string
}

export function getInputs(): Inputs {
  const template = core.getInput('template', { required: true })
  const target = core.getInput('target', { required: true })

  const dataStr = core.getInput('data', { required: true })
  const data = yaml.load(dataStr)
  if (typeof data !== 'object') {
    throw new Error('Input `data` needs to be an object')
  }

  return { data, template, target }
}
