import { ComponentWrapper } from './types.ts'

const generateFiles = async (componentWrapper: ComponentWrapper) => {
  let cssFile = ''
  let isJs = false

  for (const [_, value] of Object.entries(componentWrapper)) {
    if (value.style) cssFile += value.style
    if (value.script) isJs = true
  }

  const jsFile = isJs
    ? `window.poopComponents = ${JSON.stringify(componentWrapper)}`
    : ''

  if (jsFile || cssFile) {
    try {
      await Deno.remove('dist', { recursive: true })
      // deno-lint-ignore no-empty
    } catch {}

    await Deno.mkdir('dist')
  }

  const htmlFile = await Deno.readTextFile('./src/index.html')
  Deno.writeTextFile('dist/index.html', htmlFile)

  if (jsFile) {
    const uniqueNumber = Math.floor(Math.random() * 1000000000000000)
    Deno.writeTextFile(`dist/${uniqueNumber}.js`, jsFile)
  }

  if (cssFile) {
    const uniqueNumber = Math.floor(Math.random() * 1000000000000000)
    Deno.writeTextFile(`dist/${uniqueNumber}.css`, cssFile)
  }
}

export { generateFiles }
