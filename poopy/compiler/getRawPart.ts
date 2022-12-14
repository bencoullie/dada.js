import { PoopFileParts } from './types.ts'

const getRawPart = (rawPoopFile: string, type: PoopFileParts) => {
  let rawFilePart: RegExpMatchArray | null = null

  if (type === 'script') rawFilePart = rawPoopFile.match(/๐ฉ([\s\S]*?)๐ฉ/)
  if (type === 'html') rawFilePart = rawPoopFile.match(/๐งป([\s\S]*?)๐งป/)
  if (type === 'style') rawFilePart = rawPoopFile.match(/๐ฝ([\s\S]*?)๐ฝ/)

  return rawFilePart && rawFilePart[1].trim().replaceAll('\n', '')
}

export { getRawPart }
