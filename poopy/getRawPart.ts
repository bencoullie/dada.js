import { PoopFileParts } from './types.ts'

const getRawPart = (rawPoopFile: string, type: PoopFileParts) => {
  let rawFilePart: RegExpMatchArray | null = null

  if (type === 'script') rawFilePart = rawPoopFile.match(/💩([\s\S]*?)💩/)
  if (type === 'html') rawFilePart = rawPoopFile.match(/🧻([\s\S]*?)🧻/)
  if (type === 'style') rawFilePart = rawPoopFile.match(/🚽([\s\S]*?)🚽/)

  return rawFilePart && rawFilePart[1].trim().replaceAll('\n', '')
}

export { getRawPart }
