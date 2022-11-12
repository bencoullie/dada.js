import { getRawPart } from './getRawPart.ts'
import { ComponentWrapper, RawComponent } from './types.ts'

const generateComponentWrapper = (rawPoopComponents: RawComponent[]) => {
  const componentWrapper: ComponentWrapper = {}

  // TODO: use reduce?
  rawPoopComponents.forEach(({ name, content }) => {
    componentWrapper[name] = {
      script: '',
      html: '',
      style: '',
    }

    const script = getRawPart(content, 'script')
    if (script) componentWrapper[name].script = script

    const html = getRawPart(content, 'html')
    if (html) componentWrapper[name].html = html

    const style = getRawPart(content, 'style')
    if (style) componentWrapper[name].style = style
  })

  // eslint-disable-next-line no-console
  console.log('componentWrapper:', componentWrapper)

  return componentWrapper
}

export { generateComponentWrapper }
