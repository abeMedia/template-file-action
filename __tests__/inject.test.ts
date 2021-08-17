import { inject } from '../src/inject'
import { expect, test } from '@jest/globals'

test('injects between comment tags', async () => {
  const input = `<!-- START_TEMPLATE -->\nfoo\n<!-- END_TEMPLATE -->`
  const expected = `<!-- START_TEMPLATE -->\nbar\n<!-- END_TEMPLATE -->`
  expect(inject(input, 'bar')).toEqual(expected)
})

test('injects between comment blocks', async () => {
  const input = `/* START_TEMPLATE */\nfoo\n/* END_TEMPLATE */`
  const expected = `/* START_TEMPLATE */\nbar\n/* END_TEMPLATE */`
  expect(inject(input, 'bar')).toEqual(expected)
})

test('injects between comment lines', async () => {
  const input = `// START_TEMPLATE\nfoo\n// END_TEMPLATE`
  const expected = `// START_TEMPLATE\nbar\n// END_TEMPLATE`
  expect(inject(input, 'bar')).toEqual(expected)
})

test('injects between comment hash', async () => {
  const input = `# START_TEMPLATE\nfoo\n# END_TEMPLATE`
  const expected = `# START_TEMPLATE\nbar\n# END_TEMPLATE`
  expect(inject(input, 'bar')).toEqual(expected)
})

test('preserves whitespace in front of comments', async () => {
  const input = ` # START_TEMPLATE\nfoo\n # END_TEMPLATE`
  const expected = ` # START_TEMPLATE\nbar\n # END_TEMPLATE`
  expect(inject(input, 'bar')).toEqual(expected)
})

test("doesn't preserve whitespace following characters in front of comments", async () => {
  const input = ` # START_TEMPLATE\nfoo\nbar # END_TEMPLATE`
  const expected = ` # START_TEMPLATE\nbar\n# END_TEMPLATE`
  expect(inject(input, 'bar')).toEqual(expected)
})

test('replaces content without delimiters', async () => {
  const input = `foo`
  const expected = `bar`
  expect(inject(input, 'bar')).toEqual(expected)
})
