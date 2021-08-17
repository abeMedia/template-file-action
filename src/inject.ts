export const reDelimiter = new RegExp(
  '(?<=<!-- START_TEMPLATE -->)[\\s\\S]*(?=<!-- END_TEMPLATE -->)|' +
    '(?<=\\/\\* START_TEMPLATE \\*\\/)[\\s\\S]*(?=\\/\\* END_TEMPLATE \\*\\/)|' +
    '(?<=\\/\\/ START_TEMPLATE)[\\s\\S]*(?=\\/\\/ END_TEMPLATE)|' +
    '(?<=# START_TEMPLATE)[\\s\\S]*(?=# END_TEMPLATE)',
)

export function inject(content: string, text: string): string {
  if (reDelimiter.test(content)) {
    return content.replace(reDelimiter, `\n${text}\n`)
  }
  return text
}
