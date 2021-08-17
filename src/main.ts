import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as core from '@actions/core'
import { Liquid } from 'liquidjs'
import { inject } from './inject'
import { getInputs } from './input'

async function run(): Promise<void> {
  try {
    const inputs = getInputs()

    const engine = new Liquid()
    const tpl = engine.parse(inputs.template)
    const result: string = (await engine.render(tpl, inputs.data)).trim()

    const output = existsSync(inputs.target)
      ? inject(readFileSync(inputs.target, 'utf8'), result)
      : result

    writeFileSync(inputs.target, output)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
