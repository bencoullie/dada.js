const getRawPoopComponents = async () => {
  const poopFileNames: string[] = []

  for await (const dirEntry of Deno.readDir('src')) {
    if (dirEntry.name.includes('.poop'))
      poopFileNames.push(dirEntry.name.replace('.poop', ''))
  }

  const rawPoopComponents = []
  for (const fileName of poopFileNames) {
    const rawPoopFile = await Deno.readTextFile(`./src/${fileName}.poop`)
    const rawPoopComponent = {
      name: fileName.toLowerCase(),
      content: rawPoopFile,
    }
    rawPoopComponents.push(rawPoopComponent)
  }

  return rawPoopComponents
}

export { getRawPoopComponents }
