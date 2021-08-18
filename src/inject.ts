type Commenter = (s: string) => string

const comments: Commenter[] = [
  (s) => `<!-- ${s} -->`,
  (s) => `\\/\\* ${s} \\*\\/`,
  (s) => `\\/\\/ ${s}`,
  (s) => `# ${s}`,
]

function regex(comment: Commenter) {
  const start = comment('START_TEMPLATE')
  const end = comment('END_TEMPLATE')
  return `(?<=${start})[\\s\\S]*?(?=(^[^\\S\\r\\n]*)?${end})`
}

export const reDelimiter = new RegExp(comments.map(regex).join('|'), 'm')

export function inject(content: string, text: string): string {
  if (reDelimiter.test(content)) {
    return content.replace(reDelimiter, `\n${text}\n`)
  }
  return text
}
