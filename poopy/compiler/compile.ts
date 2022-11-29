import { generateComponentWrapper } from './generateComponentWrapper.ts'
import { generateFiles } from './generateFiles.ts'
import { getRawPoopComponents } from './getRawPoopComponents.ts'
import { movePublicFiles } from './movePublicFiles.ts'

const compile = async () => {
  const rawPoopComponents = await getRawPoopComponents()

  const componentWrapper = generateComponentWrapper(rawPoopComponents)

  generateFiles(componentWrapper)

  movePublicFiles()
}

compile()
