const domParser = new DOMParser()

const generateHtml = (poopComponentWrapper) => {
  let puttyHtml = poopComponentWrapper.app.html

  if (!puttyHtml) {
    throw new Error(
      'No entrypoint supplied. Please ensure you have an App.poop in the src directory.'
    )
  }

  const appDomRepresentation = domParser.parseFromString(puttyHtml, 'text/html')

  const traverseTree = (node) => {
    console.count()
    const childNodes = node.childNodes

    for (const childNode of childNodes) {
      const childNodeTagName = childNode.tagName?.toLowerCase()

      if (childNodeTagName?.includes('poop')) {
        const componentTagName = childNode.tagName
        const componentName = componentTagName.toLowerCase().replace('poop', '')
        const correspondingPoopComponent = poopComponentWrapper[componentName]
        const regexp = new RegExp(
          `<${componentTagName}>([\s\S]*?)<\/${componentTagName}>`,
          'gi'
        )
        puttyHtml = puttyHtml.replace(regexp, correspondingPoopComponent.html)

        const stillHasPoopComponents = puttyHtml.includes('Poop>')
        if (stillHasPoopComponents) {
          const replenishedDom = domParser.parseFromString(
            puttyHtml,
            'text/html'
          )
          traverseTree(replenishedDom)
        }
      }

      if (childNode.childNodes.length > 0) {
        traverseTree(childNode)
      }
    }
  }

  traverseTree(appDomRepresentation)

  return puttyHtml
}

const parseApp = () => {
  const poopAppHtml = generateHtml(poopComponentWrapper)
  const poopApp = domParser.parseFromString(poopAppHtml, 'text/html')

  // Create a div to insert back the contents into
  const wrapper = document.createElement('div')

  // Insert the contents back
  wrapper.innerHTML = poopApp.body.innerHTML

  document.querySelector('#root').replaceWith(wrapper)
}

parseApp()

console.log(
  '%c ✨ Component successfully parsed to window.puttyHtml ✨ ',
  'color: #bada55'
)
