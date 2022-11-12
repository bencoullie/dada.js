const poopComponentWrapper = {
  app: {
    script:
      "console.log('This');  console.log('Is');  console.log('Poopy.js');",
    html: '<div>    <h1>It is pointless</h1>    <ButtonPoop text="haha yes."></ButtonPoop>  </div>',
    style: "h1 {    color: 'tomato';  }",
  },
  button: {
    script:
      "window.clickPoop = () => {    confirm('Is this the next React?');  };",
    html: '<button onclick="window.clickPoop">{ PoopProps.text }</button>',
    style:
      "button {    background-color: 'tomato';    color: white;    border: 1px solid #eee;    border-radius: 5px;    padding: 10px;  }",
  },
}

const parseApp = (poopComponentWrapper) => {
  const domParser = new DOMParser()
  const entryPointComponent = poopComponentWrapper.app

  if (!entryPointComponent) {
    throw new Error(
      'No entrypoint supplied. Please ensure you have an App.poop in the src directory.'
    )
  }

  // TODO full on JS AST for parsing JS handlebars in HTML fuck me
  // const jsInHtml = entryPointComponent.html.match(/{([\s\S]*?)}/)[1]

  const appDomRepresentation = domParser.parseFromString(
    entryPointComponent.html,
    'text/html'
  )

  const traverseTree = (node) => {
    // Parent node
    const nodes = node.childNodes
    for (const node of nodes) {
      // Child node
      const nodeTag = node.tagName?.toLowerCase()

      if (nodeTag?.includes('poop')) {
        console.log('Found a component!:', node)
        // TODO: now I needa fukcing insert the tree from the component somehow and keep looping I guess? dunno how I'm gnna do that
        const componentTagName = node.tagName
        const componentName = componentTagName.toLowerCase().replace('poop', '')
        const correspondingPoopComponent = poopComponentWrapper[componentName]
        // eslint-disable-next-line no-console
        console.log('correspondingPoopComponent:', correspondingPoopComponent)
      }

      if (node.childNodes.length > 0) {
        traverseTree(node)
      }
    }
  }

  traverseTree(appDomRepresentation)

  return appDomRepresentation
}

window.haha = parseApp(poopComponentWrapper)
