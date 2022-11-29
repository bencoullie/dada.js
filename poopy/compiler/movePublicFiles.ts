export const movePublicFiles = async () => {
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
