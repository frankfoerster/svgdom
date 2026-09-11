import {
  createSVGWindow,
  createHTMLWindow,
  SVGMatrix,
  SVGRectElement,
  HTMLImageElement,
  config,
  type FontConfig
} from 'svgdom'

const window = createSVGWindow()
const rect: SVGRectElement = window.document.createElement('rect')
const width: number = rect.width.baseVal.value

rect.width.baseVal.value = width + 10

const clone: SVGRectElement = rect.cloneNode(true)
window.document.documentElement!.appendChild(clone)

const image: HTMLImageElement = createHTMLWindow().document.createElement('img')
image.addEventListener('load', event => {
  const type: string = event.type
  console.log(type)
})

const fontConfig: FontConfig = config.getConfig()
console.log(fontConfig, config.getFonts(), new SVGMatrix().scale(2).a)

// @ts-expect-error SVG matrix operations require numeric arguments.
new SVGMatrix().scale('2')

// @ts-expect-error SVG lengths have numeric values.
rect.width.baseVal.value = 'wide'
