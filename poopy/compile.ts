import { generateComponentWrapper } from './generateComponentWrapper.ts'
import { generateFiles } from './generateFiles.ts'
import { getRawPoopComponents } from './getRawPoopComponents.ts'

const moveOtherSrcFiles = async () => {
  const publicDir = 'src/public'
  const distDir = 'dist'
  for await (const file of Deno.readDir(publicDir)) {
    if (
      !file.name.includes('.poop') &&
      !file.name.includes('.html') &&
      file.isFile
    )
      await Deno.copyFile(
        `${publicDir}/${file.name}`,
        `${distDir}/${file.name}`
      )
  }
}

const compile = async () => {
  const rawPoopComponents = await getRawPoopComponents()

  const componentWrapper = generateComponentWrapper(rawPoopComponents)

  generateFiles(componentWrapper)

  moveOtherSrcFiles()
}

compile()
