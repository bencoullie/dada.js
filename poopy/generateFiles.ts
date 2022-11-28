import { ComponentWrapper } from './types.ts'

const generateFiles = async (componentWrapper: ComponentWrapper) => {
  let isJs = false

  for (const [_, value] of Object.entries(componentWrapper)) {
    if (value.script) isJs = true
  }

  const jsFile = isJs
    ? `window.poopComponentWrapper = ${JSON.stringify(componentWrapper)}`
    : ''

  if (jsFile) {
    try {
      await Deno.remove('dist', { recursive: true })
      // deno-lint-ignore no-empty
    } catch {}

    await Deno.mkdir('dist')
  }

  let htmlFile = await Deno.readTextFile('./src/public/index.html')
  const placeInHeadToChange = '</head>'

  if (jsFile) {
    const uniqueNumber = Math.floor(Math.random() * 1000000000000000)
    const htmlGenerator = await Deno.readTextFile(`./poopy/runApp.js`)

    htmlFile = htmlFile.replace(
      placeInHeadToChange,
      `  <script defer src="./app-${uniqueNumber}.js"></script>\r\n${placeInHeadToChange}`
    )

    const finalJsFile = `${jsFile}\n${htmlGenerator}`
    Deno.writeTextFile(`dist/app-${uniqueNumber}.js`, finalJsFile)
  }

  Deno.writeTextFile('dist/index.html', htmlFile)
}

export { generateFiles }
