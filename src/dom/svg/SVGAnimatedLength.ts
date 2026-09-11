import { SVGLength } from './SVGLength.js';

export class SVGAnimatedLength {
  baseVal: SVGLength;

  constructor(element: import('../Element.js').Element, attributeName: string) {
    this.baseVal = new SVGLength(element, attributeName);
  }

  get animVal() {
    throw new Error('animVal is not implemented');
  }
}
