export type PoopFileParts = 'script' | 'html' | 'style'

export type RawComponent = {
  name: string
  content: string
}

export type ComponentWrapper = {
  [componentName: string]: {
    script: string
    html: string
    style: string
  }
}
