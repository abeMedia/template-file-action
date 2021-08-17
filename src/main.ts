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
    let result: string = await engine.render(tpl, inputs.data)

    // remove leading & trailing line-breaks
    result = result.replace(/^\n*|\n*$/g, '')

    // if target exists inject content between delimiters
    if (existsSync(inputs.target)) {
      result = inject(readFileSync(inputs.target, 'utf8'), result)
    }

    writeFileSync(inputs.target, result)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
