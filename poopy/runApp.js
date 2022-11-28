const domParser = new DOMParser()

const generateHtml = (poopComponentWrapper) => {
  let puttyHtml = poopComponentWrapper.app.html
  let puttyCss = poopComponentWrapper.app.style

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

        if (correspondingPoopComponent.style) {
          puttyCss = `${puttyCss}\n${correspondingPoopComponent.style}`
        }

        if (correspondingPoopComponent.script) {
          eval(correspondingPoopComponent.script)
        }

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

  eval(poopComponentWrapper.app.script)

  traverseTree(appDomRepresentation)

  const styleTag = document.createElement('style')
  styleTag.textContent = puttyCss
  document.head.appendChild(styleTag)

  return puttyHtml
}

const parseApp = () => {
  const poopAppHtml = generateHtml(poopComponentWrapper)

  return domParser.parseFromString(poopAppHtml, 'text/html').body.innerHTML
}

const runApp = () => {
  const poopApp = parseApp()

  const wrapper = document.createElement('div')

  wrapper.innerHTML = poopApp

  document.querySelector('#root').replaceWith(wrapper)
}

runApp()

console.log(
  '%c ✨ Component successfully parsed to window.puttyHtml ✨ ',
  'color: #bada55'
)
