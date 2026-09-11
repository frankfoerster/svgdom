import { expectTypeOf, it } from 'vitest'
import {
  createSVGDocument,
  createHTMLWindow,
  createSVGWindow,
  SVGMatrix,
  SVGRectElement,
  SVGLength,
  HTMLImageElement,
  Element
} from '../src/index.js'

it('exposes namespace-aware DOM and geometry types', () => {
  const document = createSVGDocument()
  const rect = document.createElement('rect')
  expectTypeOf(rect).toEqualTypeOf<SVGRectElement>()
  expectTypeOf(rect.width.baseVal).toEqualTypeOf<SVGLength>()
  expectTypeOf(rect.width.baseVal.value).toEqualTypeOf<number>()
  expectTypeOf(rect.getAttribute('width')).toEqualTypeOf<string | null>()
  expectTypeOf(rect.cloneNode()).toEqualTypeOf<SVGRectElement>()
  expectTypeOf(document.querySelector('rect')).toEqualTypeOf<Element | null>()
  expectTypeOf(
    document.querySelector<SVGRectElement>('rect')
  ).toEqualTypeOf<SVGRectElement | null>()
  expectTypeOf(
    createSVGWindow().document.createElement('rect')
  ).toEqualTypeOf<SVGRectElement>()
  expectTypeOf(
    createHTMLWindow().document.createElement('img')
  ).toEqualTypeOf<HTMLImageElement>()
  expectTypeOf(new SVGMatrix().scale(2).a).toEqualTypeOf<number>()
  expectTypeOf<Parameters<SVGMatrix['scale']>[0]>().toEqualTypeOf<number>()
})
